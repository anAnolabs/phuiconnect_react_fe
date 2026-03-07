# ⚽ PhuiConnect — Nền tảng bóng đá phong trào

> **iOS · Android · Web** — Ứng dụng kết nối cộng đồng bóng đá phủi (phong trào) tại Việt Nam.

PhuiConnect giúp người chơi bóng đá phủi dễ dàng tìm đối thủ, tìm người đá ké, quản lý đội bóng, tra cứu sân bóng và tham gia giải đấu — tất cả trên một nền tảng duy nhất.

---

## 📑 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt & Chạy dự án](#-cài-đặt--chạy-dự-án)
- [Các lệnh Scripts](#-các-lệnh-scripts)
- [Chi tiết các màn hình](#-chi-tiết-các-màn-hình)
- [Hệ thống Type](#-hệ-thống-type)
- [UI Components](#-ui-components)
- [Theme & Design System](#-theme--design-system)
- [Mock Data](#-mock-data)
- [Roadmap](#-roadmap)

---

## ✨ Tính năng

| Tính năng | Mô tả | Trạng thái |
|---|---|---|
| 🔐 Đăng nhập OTP | Xác thực qua số điện thoại + OTP, hỗ trợ Google/Apple/Facebook | ✅ UI hoàn thành |
| 🏠 Trang chủ (Feed) | Dashboard tổng hợp: tin tuyển người, trận sắp tới, giải đấu | ✅ Hoàn thành |
| ⚔️ Tìm đối thủ | Danh sách trận đấu OPEN/CONFIRMED, lọc theo format & trạng thái | ✅ Hoàn thành |
| 🙋 Tìm người đá | Tin tuyển cầu thủ & cầu thủ tìm đội, duyệt danh sách cầu thủ | ✅ Hoàn thành |
| 👥 Quản lý đội bóng | Danh sách đội, chi tiết đội, đội hình, phân công nhiệm vụ | ✅ Hoàn thành |
| 👤 Hồ sơ cầu thủ | Thông tin cá nhân, chỉ số kỹ năng, thống kê trận đấu | ✅ Hoàn thành |
| 🏟️ Tìm sân bóng | Danh sách sân, lọc theo quận, bản đồ, gọi điện, chỉ đường | ✅ Hoàn thành |
| 🏆 Giải đấu | Hiển thị giải sắp tới, đăng ký tham gia | ✅ UI hoàn thành |
| 🌐 Hỗ trợ Web | Chạy trên trình duyệt qua `react-native-web` + Webpack | ✅ Hoàn thành |

---

## 🛠 Công nghệ sử dụng

| Loại | Công nghệ | Phiên bản |
|---|---|---|
| **Framework** | React Native | 0.84.0 |
| **UI Engine** | React | 19.2.3 |
| **Ngôn ngữ** | TypeScript | 5.8+ |
| **Web Support** | react-native-web | 0.21.2 |
| **Bundler (Mobile)** | Metro | (mặc định RN 0.84) |
| **Bundler (Web)** | Webpack 5 | 5.105+ |
| **Testing** | Jest + react-test-renderer | 29.x |
| **Linting** | ESLint | 8.x |
| **iOS Deps** | CocoaPods | via Gemfile |
| **Safe Area** | react-native-safe-area-context | 5.5+ |

---

## 📂 Cấu trúc thư mục

```
PhuiConnect2/
├── App.tsx                          # Entry component — quản lý auth state & navigation
├── index.js                         # Entry point cho Android/iOS
├── index.web.js                     # Entry point cho Web (mount vào DOM)
│
├── src/
│   ├── components/
│   │   └── ui.tsx                   # Shared UI components (Avatar, Button, Badge, Card, Input, SkillBar, Rating, ...)
│   │
│   ├── constants/
│   │   └── theme.ts                 # Design tokens: COLORS, FONTS, SPACING, RADIUS, SHADOWS, POSITIONS, SKILL_LABELS
│   │
│   ├── data/
│   │   └── mockData.ts             # Dữ liệu giả lập: users, players, teams, matches, posts, stadiums, tournaments
│   │
│   ├── navigation/
│   │   └── BottomTabBar.tsx         # Bottom tab bar component (5 tabs)
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx      # Màn hình đăng nhập (OTP + Social login)
│   │   ├── home/
│   │   │   └── HomeScreen.tsx       # Trang chủ / Feed
│   │   ├── match/
│   │   │   └── FindMatchScreen.tsx  # Tìm đối thủ & danh sách trận đấu
│   │   ├── find/
│   │   │   └── FindPlayerScreen.tsx # Tìm người đá & danh sách cầu thủ
│   │   ├── team/
│   │   │   └── TeamsScreen.tsx      # Đội bóng (list + detail + đội hình + phân công)
│   │   ├── profile/
│   │   │   └── ProfileScreen.tsx    # Hồ sơ cầu thủ
│   │   └── stadium/
│   │       └── StadiumScreen.tsx    # Tìm sân bóng (list + map placeholder)
│   │
│   └── types/
│       └── index.ts                 # TypeScript type definitions cho toàn bộ domain
│
├── android/                         # Native Android project (Kotlin)
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── java/com/phuiconnect2/
│   │           ├── MainActivity.kt
│   │           └── MainApplication.kt
│   ├── build.gradle
│   ├── settings.gradle
│   └── gradle/
│
├── ios/                             # Native iOS project (Swift)
│   ├── Podfile
│   ├── PhuiConnect2/
│   │   ├── AppDelegate.swift
│   │   └── Info.plist
│   └── PhuiConnect2.xcodeproj/
│
├── web/
│   └── index.html                   # HTML template cho Webpack
│
├── __tests__/
│   └── App.test.tsx                 # Unit test mẫu
│
├── app.json                         # Tên app: PhuiConnect2
├── babel.config.js                  # Babel preset cho React Native
├── metro.config.js                  # Metro bundler config
├── webpack.config.js                # Webpack config cho web build
├── tsconfig.json                    # TypeScript config
├── jest.config.js                   # Jest test config
├── package.json                     # Dependencies & scripts
└── Gemfile                          # Ruby dependencies cho CocoaPods (iOS)
```

---

## 💻 Yêu cầu hệ thống

- **Node.js** >= 22.11.0
- **npm** (đi kèm Node.js)
- **React Native CLI** — `@react-native-community/cli` 20.1.0
- **Android Studio** (cho Android) — SDK, emulator
- **Xcode** >= 15 (cho iOS, chỉ macOS) — CocoaPods, simulator
- **Ruby** >= 2.6.10 (cho iOS CocoaPods)

---

## 🚀 Cài đặt & Chạy dự án

### 1. Clone & cài dependencies

```bash
git clone <repo-url>
cd PhuiConnect2
npm install
```

### 2. Chạy trên Android

```bash
npm run android
```

> Đảm bảo Android emulator đang chạy hoặc có thiết bị kết nối qua ADB.

### 3. Chạy trên iOS (chỉ macOS)

```bash
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

### 4. Chạy trên Web

```bash
npm run web
```

> Mở trình duyệt tại `http://localhost:3000`. Giao diện mobile-first, max-width 480px ở giữa trang.

### 5. Build Web production

```bash
npm run web:build
```

> Output tại thư mục `dist/`.

---

## 📜 Các lệnh Scripts

| Lệnh | Mô tả |
|---|---|
| `npm start` | Khởi chạy Metro dev server |
| `npm run android` | Build & chạy trên Android |
| `npm run ios` | Build & chạy trên iOS |
| `npm run web` | Khởi chạy Webpack dev server (port 3000) |
| `npm run web:build` | Build production cho web |
| `npm run lint` | Chạy ESLint kiểm tra code |
| `npm test` | Chạy Jest unit tests |

---

## 📱 Chi tiết các màn hình

### 🔐 LoginScreen (`src/screens/auth/LoginScreen.tsx`)
- Hiển thị hero banner "PhuiConnect"
- Form nhập số điện thoại → gửi OTP → xác nhận
- Đăng nhập nhanh qua Google, Apple, Facebook
- Hiển thị 4 tính năng chính của app

### 🏠 HomeScreen (`src/screens/home/HomeScreen.tsx`)
- Header với lời chào & nút thông báo
- **Quick Actions**: 4 lối tắt (Tìm đối, Tìm người, Tìm sân, Đội bóng)
- **Đang tìm người**: Horizontal scroll danh sách bài đăng tuyển mới nhất
- **Trận sắp tới**: Card hiển thị đội chủ nhà VS đối thủ (hoặc "Đang tìm...")
- **Giải đấu**: Card thông tin giải, số đội đăng ký, nút tham gia
- Pull-to-refresh

### ⚔️ FindMatchScreen (`src/screens/match/FindMatchScreen.tsx`)
- Header + nút "Tạo trận"
- **Bộ lọc**: Loại sân (5v5, 7v7, 11v11) & Trạng thái (OPEN, CONFIRMED, FINISHED)
- Card trận đấu: logo đội, VS, thông tin sân, ngày giờ, ghi chú
- Nút "Xin đấu" cho trận OPEN

### 🙋 FindPlayerScreen (`src/screens/find/FindPlayerScreen.tsx`)
- Toggle giữa 2 chế độ: **Tin tuyển người** & **Cầu thủ**
- **Tin tuyển người**: Filter theo loại (tuyển người / tìm đội), chi tiết bài đăng
- **Cầu thủ**: Card hiển thị thông tin, top 3 kỹ năng, bio, nút mời vào đội
- Hàm `getTimeAgo()` hiển thị "X giờ trước"

### 👥 TeamsScreen (`src/screens/team/TeamsScreen.tsx`)
- Tab "Đội của tôi" & "Khám phá"
- Card đội: avatar, tên, sân nhà, số thành viên, level
- **TeamDetailScreen** (cùng file):
  - Hero header với thông tin đội
  - Thống kê: thành viên, số trận, thành tích (W-D-L)
  - **Đội hình**: chọn format 5v5/7v7/11v11, hiển thị sân cỏ xanh với vị trí cầu thủ
  - **Danh sách thành viên**: role (chủ đội/đội trưởng/thành viên), vị trí
  - **Phân công nhiệm vụ**: thu tiền, mang bóng, đặt sân, mang áo
  - Actions: Tìm đối thủ, Tuyển thêm người

### 👤 ProfileScreen (`src/screens/profile/ProfileScreen.tsx`)
- Header xanh với avatar, tên, vị trí, rating
- **Thống kê**: Số trận, đánh giá, skill level, số đội bóng
- **Giới thiệu**: bio, năm sinh, chiều cao, cân nặng, chân thuận, khu vực, phong cách
- **Chỉ số kỹ năng**: 6 thanh skill bar (Tốc độ, Chuyền, Sút, Rê bóng, Phòng ngự, Thể lực)
- **Đội bóng**: danh sách đội đang tham gia
- **Thời gian rảnh**: Sáng / Chiều / Tối / Đêm
- Nút đăng xuất

### 🏟️ StadiumScreen (`src/screens/stadium/StadiumScreen.tsx`)
- Header + toggle Danh sách / Bản đồ
- **Filter theo quận**: Thủ Đức, Quận 7, Bình Thạnh, Gò Vấp, Quận 1, ...
- **List view**: Card sân với hình ảnh, tên, địa chỉ, giá, rating, formats, nút Gọi/Chỉ đường/Đặt sân
- **Map view**: Placeholder bản đồ với các dot vị trí sân
- Tích hợp `Linking` để mở Google Maps & gọi điện

---

## 🧩 Hệ thống Type (`src/types/index.ts`)

Các type chính được định nghĩa:

| Type/Interface | Mô tả |
|---|---|
| `User` | Thông tin người dùng (id, phone, email, name, role) |
| `PlayerProfile` | Hồ sơ cầu thủ chi tiết (vị trí, kỹ năng, thống kê, bio) |
| `Team` | Đội bóng (tên, level, sân nhà, số thành viên) |
| `TeamMember` | Thành viên đội (role, position, status) |
| `Match` | Trận đấu (đội chủ, đối thủ, sân, format, status, score) |
| `FindPlayerPost` | Bài đăng tìm người/tìm đội |
| `Stadium` | Sân bóng (địa chỉ, tọa độ, giá, rating, formats) |
| `Tournament` | Giải đấu (thể thức, số đội, phí, trạng thái) |
| `Position` | Enum vị trí: GK, CB, LB, RB, DM, CM, AM, LW, RW, ST |
| `MatchFormat` | `'5v5' \| '7v7' \| '11v11'` |
| `MatchStatus` | `'OPEN' \| 'CONFIRMED' \| 'FINISHED' \| 'CANCELLED'` |

---

## 🎨 UI Components (`src/components/ui.tsx`)

Các component tái sử dụng:

| Component | Props chính | Mô tả |
|---|---|---|
| `Avatar` | `name`, `size`, `color` | Hiển thị chữ cái đầu tên với màu nền hash |
| `Button` | `title`, `variant`, `size`, `icon`, `disabled` | 4 variant: primary, secondary, outline, ghost |
| `Badge` | `text`, `color`, `bgColor` | Label nhỏ dạng pill |
| `Card` | `children`, `onPress`, `style` | Container có shadow, hỗ trợ pressable |
| `Input` | `label`, `placeholder`, `value`, `onChangeText`, `secureTextEntry` | Form input có label |
| `SkillBar` | `label`, `value`, `maxValue`, `color` | Thanh tiến trình hiển thị kỹ năng |
| `Rating` | `rating`, `size` | Hiển thị sao đánh giá |
| `SectionHeader` | `title`, `actionText`, `onAction` | Tiêu đề section + nút xem thêm |
| `StatusBadge` | `status` | Badge trạng thái trận đấu (OPEN, CONFIRMED, ...) |
| `EmptyState` | `icon`, `title`, `subtitle` | Placeholder khi không có data |

---

## 🎨 Theme & Design System (`src/constants/theme.ts`)

### Bảng màu
- **Primary**: `#10B981` (xanh lá — sân cỏ)
- **Secondary**: `#F59E0B` (vàng amber — bóng đá)
- **Accent**: `#3B82F6` (xanh dương)
- **Background**: `#F8FAFC` · **Surface**: `#FFFFFF`

### Typography
- **System font** — 8 cấp size: xs(10) → hero(36)

### Spacing
- 7 cấp: xs(4), sm(8), md(12), lg(16), xl(20), xxl(24), xxxl(32)

### Border Radius
- sm(6), md(10), lg(14), xl(20), full(999)

### Constants
- `POSITIONS`: Map vị trí → tên tiếng Việt (GK → "Thủ môn")
- `SKILL_LABELS`: Map skill → tên tiếng Việt (speed → "Tốc độ")
- `PLAY_TIMES`: Map thời gian chơi → label
- `MATCH_FORMATS`: `['5v5', '7v7', '11v11']`

---

## 📦 Mock Data (`src/data/mockData.ts`)

| Dataset | Số lượng | Mô tả |
|---|---|---|
| `MOCK_USER` | 1 | User hiện tại (Hoàng Sơn) |
| `MOCK_PLAYERS` | 5 | 5 cầu thủ mẫu với đầy đủ chỉ số |
| `MOCK_TEAMS` | 4 | FC Thủ Đức, Quận 7 United, Bình Thạnh Stars, Gò Vấp Warriors |
| `MOCK_MATCHES` | 4 | Các trận với trạng thái OPEN, CONFIRMED, FINISHED |
| `MOCK_FIND_POSTS` | 5 | 3 tin tuyển người + 2 tin tìm đội |
| `MOCK_STADIUMS` | 6 | 6 sân bóng khu vực TP.HCM với tọa độ GPS |
| `MOCK_TOURNAMENTS` | 2 | 2 giải đấu sắp tới |

---

## 🗺 Roadmap

### Giai đoạn hiện tại (v0.1 — UI Prototype)
- [x] Đăng nhập OTP (UI)
- [x] Trang chủ / Feed
- [x] Tìm đối thủ
- [x] Tìm người đá
- [x] Quản lý đội bóng + chi tiết đội
- [x] Hồ sơ cầu thủ
- [x] Tìm sân bóng
- [x] Hỗ trợ Web

### Giai đoạn tiếp theo (v0.2+)
- [ ] Tích hợp Backend API (thay thế mock data)
- [ ] Xác thực OTP thật (Firebase Auth / backend)
- [ ] Navigation library (React Navigation)
- [ ] Tạo trận đấu (CreateMatch screen)
- [ ] Tạo bài đăng tìm người (CreateFindPost screen)
- [ ] Chi tiết trận đấu (MatchDetail screen)
- [ ] Chi tiết bài tìm người (FindPlayerDetail screen)
- [ ] Tạo đội mới (CreateTeam screen)
- [ ] Tích hợp Google Maps (thay thế placeholder)
- [ ] Chat / Nhắn tin
- [ ] Push notifications
- [ ] Dark mode
- [ ] Quản lý giải đấu

---

## 🏗 Kiến trúc & Ghi chú kỹ thuật

### Navigation
- Hiện tại sử dụng **state-based navigation** tự viết trong `App.tsx` (chưa dùng React Navigation)
- `BottomTabBar` với 5 tab: Trang chủ, Tìm đối, Tìm người, Đội bóng, Cá nhân
- Sub-screen (TeamDetail, Stadiums) render ngoài tab system

### Web Support
- `index.web.js` → mount vào DOM element `#root`
- Webpack alias `react-native` → `react-native-web`
- Mobile-first design: `maxWidth: 480px` trên web
- Platform-specific padding cho StatusBar

### Đa nền tảng
- `Platform.OS` check cho iOS/Android/Web padding
- `Linking` API cho Google Maps & phone calls
- `KeyboardAvoidingView` cho iOS keyboard

---

## 📄 License

Private project — PhuiConnect © 2025-2026

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
