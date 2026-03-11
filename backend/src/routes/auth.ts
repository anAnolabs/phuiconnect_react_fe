// =============================================
// PhuiConnect Backend - Auth Routes
// =============================================
import { Router, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import { userRepo } from '../database';
import { generateToken, authRequired } from '../middleware/auth';

const router = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID || '';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// ---- POST /api/auth/google ----
// Receive Google ID token from client, verify, create/find user, return JWT
router.post('/google', async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({ error: 'idToken is required' });
      return;
    }

    // Verify ID token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ error: 'Invalid Google token' });
      return;
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      res.status(400).json({ error: 'Email not available from Google account' });
      return;
    }

    // Find existing user by Google ID or email
    let user = userRepo.findByGoogleId(googleId!);

    if (!user) {
      // Try by email (user might have signed up differently before)
      user = userRepo.findByEmail(email);
    }

    if (!user) {
      // Create new user
      user = userRepo.create({
        id: uuidv4(),
        email,
        name: name || email.split('@')[0],
        avatar: picture || '',
        google_id: googleId!,
        login_method: 'google',
        phone: '',
        location: '',
        role: 'player',
      });
    }

    // Generate JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        role: user.role,
        loginMethod: user.login_method,
        createdAt: user.created_at,
      },
    });
  } catch (error: any) {
    console.error('Google auth error:', error.message);
    res.status(401).json({ error: 'Google authentication failed' });
  }
});

// ---- GET /api/auth/me ----
// Get current user info (requires JWT)
router.get('/me', authRequired, (req: Request, res: Response) => {
  try {
    const user = userRepo.findById(req.user!.userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        role: user.role,
        loginMethod: user.login_method,
        createdAt: user.created_at,
      },
    });
  } catch (error: any) {
    console.error('Get user error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---- PUT /api/auth/profile ----
// Update user profile (requires JWT)
router.put('/profile', authRequired, (req: Request, res: Response) => {
  try {
    const { name, phone, location, avatar } = req.body;

    const user = userRepo.updateProfile(req.user!.userId, {
      name,
      phone,
      location,
      avatar,
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        role: user.role,
        loginMethod: user.login_method,
        createdAt: user.created_at,
      },
    });
  } catch (error: any) {
    console.error('Update profile error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
