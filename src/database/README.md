# Database Documentation

## Cấu trúc Database

Ứng dụng sử dụng SQLite để lưu trữ dữ liệu local. Database được khởi tạo tự động khi app start.

## Cấu trúc thư mục

```
src/database/
├── index.ts                    # Database instance & initialization
├── migrations/
│   ├── 001_initial_schema.sql  # Schema SQL
│   └── migrationRunner.ts      # Migration runner
├── models/                     # TypeScript interfaces
│   ├── Book.ts
│   ├── Annotation.ts
│   ├── User.ts
│   ├── UserSettings.ts
│   └── index.ts
└── repositories/               # Data access layer
    ├── BookRepository.ts
    ├── AnnotationRepository.ts
    ├── UserRepository.ts
    ├── SettingsRepository.ts
    └── index.ts
```

## Models

### Book
- Lưu thông tin sách: title, author, format, file path, progress, etc.

### Annotation
- Lưu highlights, notes, marks trong sách
- Liên kết với Book qua `book_id`

### User
- Thông tin người dùng cơ bản

### UserSettings
- Cài đặt người dùng: dark mode, font size, language, API key

## Repositories

Mỗi repository cung cấp các method CRUD cho model tương ứng:

- `create()` - Tạo mới
- `findById()` - Tìm theo ID
- `update()` - Cập nhật
- `delete()` - Xóa (soft delete)

## Hooks

Sử dụng hooks để truy cập dữ liệu trong components:

```typescript
import { useBooks, useSettings } from '../hooks';

const { books, loading, addBook, updateBook } = useBooks(userId);
const { settings, updateSettings } = useSettings(userId);
```

## Migration

Khi cần thay đổi schema:
1. Tạo file SQL mới trong `migrations/`
2. Thêm vào array `MIGRATIONS` trong `migrationRunner.ts`
3. Migration sẽ tự động chạy khi app start

## Sử dụng

Database được khởi tạo tự động trong `App.tsx`. Không cần gọi `getDatabase()` trực tiếp trong components, sử dụng hooks thay thế.

