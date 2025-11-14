# Database Setup Guide

## Đã hoàn thành

✅ Đã cài đặt `react-native-sqlite-storage`
✅ Đã tạo cấu trúc database (models, repositories, migrations)
✅ Đã tích hợp vào App.tsx và SettingsTab
✅ Database sẽ tự động khởi tạo khi app start

## Cấu trúc Database

### Tables
- `users` - Thông tin người dùng
- `books` - Danh sách sách
- `annotations` - Highlights, notes, marks
- `user_settings` - Cài đặt người dùng
- `ai_summaries` - Tóm tắt AI
- `ai_questions` - Câu hỏi và trả lời AI
- `migrations` - Tracking migrations

## Cách sử dụng

### Trong Components

```typescript
import { useBooks, useSettings } from '../hooks';

// Load books
const { books, loading, addBook, updateBook, deleteBook } = useBooks(userId);

// Load settings
const { settings, updateSettings } = useSettings(userId);
```

### Thêm sách mới

```typescript
await addBook({
  user_id: userId,
  title: 'Book Title',
  author: 'Author Name',
  format: 'PDF',
  file_path: '/path/to/file',
  progress: 0,
});
```

### Cập nhật settings

```typescript
await updateSettings({
  dark_mode: true,
  font_size: 18,
  language: 'vietnamese',
});
```

## Build & Run

Sau khi cài đặt, cần rebuild app:

### Android
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS
```bash
cd ios
pod install
cd ..
npm run ios
```

## Lưu ý

1. Database file sẽ được tạo tại: `{app_data_dir}/DeepRead.db`
2. Migrations tự động chạy khi app start lần đầu
3. Tất cả dữ liệu được lưu local trên thiết bị
4. User ID hiện tại hardcode là 'user-1', có thể thay đổi trong App.tsx

## Troubleshooting

### Lỗi "Database not initialized"
- Đảm bảo đã rebuild app sau khi cài package
- Kiểm tra console logs để xem lỗi cụ thể

### Lỗi "Module not found"
- Chạy `npm install` lại
- Xóa `node_modules` và `package-lock.json`, sau đó `npm install`

### Android build errors
- Đảm bảo đã chạy `./gradlew clean`
- Kiểm tra `android/app/build.gradle` có đúng cấu hình

