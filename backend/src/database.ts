// =============================================
// PhuiConnect Backend - Database Setup (SQLite)
// =============================================
import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'data', 'phuiconnect.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db: DatabaseType = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// ---- Schema ----
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT DEFAULT '',
    google_id TEXT UNIQUE,
    login_method TEXT NOT NULL DEFAULT 'google',
    phone TEXT DEFAULT '',
    location TEXT DEFAULT '',
    role TEXT NOT NULL DEFAULT 'player',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// ---- User Repository ----
export interface DbUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  google_id: string | null;
  login_method: string;
  phone: string;
  location: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export const userRepo = {
  findByGoogleId(googleId: string): DbUser | undefined {
    return db.prepare('SELECT * FROM users WHERE google_id = ?').get(googleId) as DbUser | undefined;
  },

  findByEmail(email: string): DbUser | undefined {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DbUser | undefined;
  },

  findById(id: string): DbUser | undefined {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as DbUser | undefined;
  },

  create(user: Omit<DbUser, 'created_at' | 'updated_at'>): DbUser {
    const stmt = db.prepare(`
      INSERT INTO users (id, email, name, avatar, google_id, login_method, phone, location, role)
      VALUES (@id, @email, @name, @avatar, @google_id, @login_method, @phone, @location, @role)
    `);
    stmt.run(user);
    return this.findById(user.id)!;
  },

  updateProfile(id: string, data: Partial<Pick<DbUser, 'name' | 'avatar' | 'phone' | 'location'>>): DbUser | undefined {
    const fields: string[] = [];
    const values: any = { id };

    if (data.name !== undefined) { fields.push('name = @name'); values.name = data.name; }
    if (data.avatar !== undefined) { fields.push('avatar = @avatar'); values.avatar = data.avatar; }
    if (data.phone !== undefined) { fields.push('phone = @phone'); values.phone = data.phone; }
    if (data.location !== undefined) { fields.push('location = @location'); values.location = data.location; }

    if (fields.length === 0) return this.findById(id);

    fields.push("updated_at = datetime('now')");
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = @id`;
    db.prepare(sql).run(values);
    return this.findById(id);
  },
};

export default db;
