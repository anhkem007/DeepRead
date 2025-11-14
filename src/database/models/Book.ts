export interface Book {
  id: string;
  user_id: string;
  title: string;
  author?: string;
  isbn?: string;
  cover_url?: string;
  format: 'PDF' | 'ePub' | 'TXT';
  file_path: string;
  file_uri?: string;
  file_copy_uri?: string;
  file_size?: number;
  progress: number; // 0-100
  last_cfi?: string;
  last_read_at?: number; // Unix timestamp
  added_at: number;
  updated_at: number;
  deleted_at?: number;
}

export interface BookRow {
  id: string;
  user_id: string;
  title: string;
  author: string | null;
  isbn: string | null;
  cover_url: string | null;
  format: string;
  file_path: string;
  file_uri: string | null;
  file_copy_uri: string | null;
  file_size: number | null;
  progress: number;
  last_cfi: string | null;
  last_read_at: number | null;
  added_at: number;
  updated_at: number;
  deleted_at: number | null;
}

export const mapRowToBook = (row: BookRow): Book => ({
  id: row.id,
  user_id: row.user_id,
  title: row.title,
  author: row.author || undefined,
  isbn: row.isbn || undefined,
  cover_url: row.cover_url || undefined,
  format: row.format as Book['format'],
  file_path: row.file_path,
  file_uri: row.file_uri || undefined,
  file_copy_uri: row.file_copy_uri || undefined,
  file_size: row.file_size || undefined,
  progress: row.progress,
  last_cfi: row.last_cfi || undefined,
  last_read_at: row.last_read_at || undefined,
  added_at: row.added_at,
  updated_at: row.updated_at,
  deleted_at: row.deleted_at || undefined,
});

