import { getDatabase } from '../index';
import { Book, BookRow, mapRowToBook } from '../models/Book';
import { generateId } from '../../utils/uuid';

type Database = ReturnType<typeof import('react-native-nitro-sqlite').open>;

export class BookRepository {
  private getDb(): Database {
    return getDatabase();
  }

  create(book: Omit<Book, 'id' | 'added_at' | 'updated_at'>): Book {
    const db = this.getDb();
    const id = generateId();
    const now = Math.floor(Date.now() / 1000);

    db.execute(
      `INSERT INTO books (
        id, user_id, title, author, isbn, cover_url, format,
        file_path, file_uri, file_copy_uri, file_size,
        progress, last_cfi, last_read_at, added_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        book.user_id,
        book.title,
        book.author || null,
        book.isbn || null,
        book.cover_url || null,
        book.format,
        book.file_path,
        book.file_uri || null,
        book.file_copy_uri || null,
        book.file_size || null,
        book.progress,
        book.last_cfi || null,
        book.last_read_at || null,
        now,
        now,
      ]
    );

    const created = this.findById(id);
    if (!created) {
      throw new Error('Failed to create book');
    }
    return created;
  }

  findById(id: string): Book | null {
    const db = this.getDb();
    const result = db.execute(
      'SELECT * FROM books WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    return mapRowToBook(result.rows.item(0) as BookRow);
  }

  findByUserId(userId: string): Book[] {
    const db = this.getDb();
    const result = db.execute(
      `SELECT * FROM books 
       WHERE user_id = ? AND deleted_at IS NULL 
       ORDER BY last_read_at DESC, added_at DESC`,
      [userId]
    );

    const books: Book[] = [];
    if (result.rows && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        books.push(mapRowToBook(result.rows.item(i) as BookRow));
      }
    }

    return books;
  }

  update(id: string, updates: Partial<Book>): Book {
    const db = this.getDb();
    const now = Math.floor(Date.now() / 1000);
    
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'added_at' && key !== 'user_id') {
        fields.push(`${key} = ?`);
        values.push(value !== undefined ? value : null);
      }
    });

    if (fields.length === 0) {
      const existing = this.findById(id);
      if (!existing) {
        throw new Error('Book not found');
      }
      return existing;
    }

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    db.execute(
      `UPDATE books SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    const updated = this.findById(id);
    if (!updated) {
      throw new Error('Book not found after update');
    }
    return updated;
  }

  delete(id: string): void {
    const db = this.getDb();
    const now = Math.floor(Date.now() / 1000);
    
    db.execute(
      'UPDATE books SET deleted_at = ?, updated_at = ? WHERE id = ?',
      [now, now, id]
    );
  }

  updateProgress(id: string, progress: number, lastCfi?: string): void {
    const db = this.getDb();
    const now = Math.floor(Date.now() / 1000);

    db.execute(
      `UPDATE books 
       SET progress = ?, last_cfi = ?, last_read_at = ?, updated_at = ? 
       WHERE id = ?`,
      [progress, lastCfi || null, now, now, id]
    );
  }
}

export const bookRepository = new BookRepository();
