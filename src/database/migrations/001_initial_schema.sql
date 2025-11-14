-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    last_login_at INTEGER
);

-- Books table
CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    isbn TEXT,
    cover_url TEXT,
    format TEXT NOT NULL CHECK(format IN ('PDF', 'ePub', 'TXT')),
    file_path TEXT NOT NULL,
    file_uri TEXT,
    file_copy_uri TEXT,
    file_size INTEGER,
    progress REAL DEFAULT 0 CHECK(progress >= 0 AND progress <= 100),
    last_cfi TEXT,
    last_read_at INTEGER,
    added_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    deleted_at INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_books_user_id ON books(user_id);
CREATE INDEX IF NOT EXISTS idx_books_last_read_at ON books(last_read_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn);

-- Annotations table
CREATE TABLE IF NOT EXISTS annotations (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('highlight', 'mark', 'note')),
    cfi_range TEXT NOT NULL,
    selected_text TEXT,
    color TEXT,
    note_text TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    deleted_at INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_annotations_book_id ON annotations(book_id);
CREATE INDEX IF NOT EXISTS idx_annotations_user_id ON annotations(user_id);
CREATE INDEX IF NOT EXISTS idx_annotations_type ON annotations(type);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    dark_mode INTEGER DEFAULT 0 CHECK(dark_mode IN (0, 1)),
    font_size INTEGER DEFAULT 16 CHECK(font_size >= 12 AND font_size <= 24),
    language TEXT DEFAULT 'english' CHECK(language IN ('english', 'vietnamese')),
    openai_api_key TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI Summaries table
CREATE TABLE IF NOT EXISTS ai_summaries (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    annotation_id TEXT,
    cfi_range TEXT NOT NULL,
    original_text TEXT NOT NULL,
    summary_text TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (annotation_id) REFERENCES annotations(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_summaries_book_id ON ai_summaries(book_id);
CREATE INDEX IF NOT EXISTS idx_ai_summaries_user_id ON ai_summaries(user_id);

-- AI Questions table
CREATE TABLE IF NOT EXISTS ai_questions (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    annotation_id TEXT,
    cfi_range TEXT NOT NULL,
    context_text TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'answered', 'failed')),
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_ai_questions_book_id ON ai_questions(book_id);
CREATE INDEX IF NOT EXISTS idx_ai_questions_user_id ON ai_questions(user_id);

