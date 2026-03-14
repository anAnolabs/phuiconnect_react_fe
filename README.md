# ⚽ PhuiConnect

**Nền tảng bóng đá phong trào** — Kết nối cầu thủ, đội bóng và sân bóng trên toàn quốc.

> React Native · TypeScript · iOS · Android · Web

---

## 📱 Giới thiệu

PhuiConnect là ứng dụng dành cho cộng đồng bóng đá phong trào Việt Nam. Ứng dụng giúp:

- 🔍 **Tìm trận đấu** — Xem và tham gia các trận đấu gần bạn
- 👤 **Tìm cầu thủ** — Kết nối với cầu thủ theo vị trí, kỹ năng và thời gian rảnh
- 🏆 **Quản lý đội bóng** — Tạo và quản lý đội, xem thành viên
- 🏟️ **Sân bóng** — Khám phá sân bóng trong khu vực
- 🔐 **Đăng nhập Google** — Xác thực nhanh chóng, bảo mật

---

## 🗂 Cấu trúc dự án

```
PhuiConnect2/
├── App.tsx                 # Root component & navigation
├── index.js                # Native entry point
├── index.web.js            # Web entry point
├── src/
│   ├── screens/
│   │   ├── auth/           # LoginScreen
│   │   ├── home/           # HomeScreen
│   │   ├── match/          # FindMatchScreen
│   │   ├── find/           # FindPlayerScreen
│   │   ├── team/           # TeamsScreen, TeamDetailScreen
│   │   ├── stadium/        # StadiumScreen
│   │   └── profile/        # ProfileScreen
│   ├── navigation/
│   │   └── BottomTabBar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   ├── api.ts          # HTTP client (localhost:3001)
│   │   └── authService.ts  # Google Sign-In + session
│   ├── constants/
│   │   └── theme.ts        # Colors, fonts, spacing
│   ├── data/
│   │   └── mockData.ts     # Dữ liệu mock
│   └── types/
├── ios/                    # Xcode project (PhuiConnect2)
├── android/                # Android project
└── web/                    # Web assets
```

---

## 🚀 Bắt đầu

### Yêu cầu hệ thống

| Công cụ | Phiên bản |
|---|---|
| Node.js | ≥ 22.11.0 |
| React Native | 0.84.0 |
| Ruby / CocoaPods | Mới nhất |
| Xcode | ≥ 15 (iOS) |
| Android Studio | (Android) |

### Cài đặt dependencies

```bash
# Cài Node packages
npm install

# Cài CocoaPods (iOS)
cd ios && pod install && cd ..
```

---

## ▶️ Chạy ứng dụng

### iOS (Simulator)

```bash
# Khởi động Metro bundler
npm start

# Chạy trên iOS simulator (terminal mới)
npm run ios
```

Hoặc mở trực tiếp trong Xcode:

```bash
open ios/PhuiConnect2.xcworkspace
```

Chọn simulator → nhấn **▶ Run**.

### Android (Emulator)

```bash
npm run android
```

> API URL tự động chuyển sang `http://10.0.2.2:3001` trên Android emulator.

### Web

```bash
# Dev server
npm run web

# Production build
npm run web:build
```

---

## 🔐 Cấu hình Google Sign-In

1. Tạo OAuth 2.0 Client ID tại [Google Cloud Console](https://console.cloud.google.com/)
2. Cập nhật `webClientId` trong `src/services/authService.ts`:

```ts
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

3. Thêm `client_id` trong phần web:

```ts
google.accounts.id.initialize({
  client_id: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
  ...
});
```

---

## 🌐 Backend API

Backend mặc định chạy tại:

| Platform | URL |
|---|---|
| iOS Simulator & Web | `http://localhost:3001` |
| Android Emulator | `http://10.0.2.2:3001` |

### Endpoints sử dụng

| Method | Endpoint | Mô tả |
|---|---|---|
| `POST` | `/api/auth/google` | Đăng nhập với Google ID Token |
| `GET` | `/api/auth/me` | Lấy thông tin user hiện tại |
| `PUT` | `/api/auth/profile` | Cập nhật hồ sơ |
| `GET` | `/api/health` | Health check |

Xem chi tiết backend tại thư mục `backend/`.

---

## 🎨 Design System

Tất cả token thiết kế được định nghĩa trong `src/constants/theme.ts`:

| Token | Mô tả |
|---|---|
| `COLORS.primary` | `#10B981` — Xanh lá (sân cỏ) |
| `COLORS.secondary` | `#F59E0B` — Vàng cam (bóng đá) |
| `COLORS.accent` | `#3B82F6` — Xanh dương |
| `SPACING` | `xs/sm/md/lg/xl/xxl/xxxl` |
| `RADIUS` | Bo góc `sm → full` |
| `SHADOWS` | `sm / md / lg` |

---

## 🧭 Navigation

Ứng dụng dùng tab navigation tùy chỉnh (không dùng React Navigation):

```
AppContent
├── LoginScreen          (khi chưa đăng nhập)
├── Loading              (khi đang restore session)
└── Main (authenticated)
    ├── BottomTabBar
    │   ├── Home
    │   ├── FindMatch
    │   ├── FindPlayer
    │   ├── Teams
    │   └── Profile
    ├── TeamDetailScreen (sub-screen)
    └── StadiumScreen    (sub-screen)
```

---

## 🧪 Kiểm thử

```bash
# Chạy toàn bộ test
npm test

# Kiểm tra lint
npm run lint
```

---

## 📦 Dependencies chính

| Thư viện | Phiên bản | Mục đích |
|---|---|---|
| `react-native` | 0.84.0 | Core framework |
| `react` | 19.2.3 | UI library |
| `@react-native-async-storage/async-storage` | ^3.0.1 | Lưu session local |
| `react-native-safe-area-context` | ^5.5.2 | Safe area |
| `react-native-web` | ^0.21.2 | Web support |

---

## 📝 Ghi chú phát triển

- **Mock data**: Khi backend chưa sẵn sàng, dữ liệu giả được lấy từ `src/data/mockData.ts`
- **Session caching**: Nếu backend tạm thời down, app sẽ dùng dữ liệu user đã cache trong AsyncStorage
- **Platform-aware**: Code tự phát hiện `ios / android / web` và điều chỉnh hành vi phù hợp
- **Screens TODO**: `CreateTeam`, `CreateMatch`, `CreateFindPost`, `MatchDetail`, `FindPlayerDetail` đang trong kế hoạch phát triển tiếp theo

---

## 📄 License

Private — © PhuiConnect Team