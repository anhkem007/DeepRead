import { getDatabase } from '../index';
import { Annotation, AnnotationRow, mapRowToAnnotation } from '../models/Annotation';
import { generateId } from '../../utils/uuid';

type Database = ReturnType<typeof import('react-native-nitro-sqlite').open>;

export class AnnotationRepository {
  private getDb(): Database {
    return getDatabase();
  }

  create(annotation: Omit<Annotation, 'id' | 'created_at' | 'updated_at'>): Annotation {
    const db = this.getDb();
    const id = generateId();
    const now = Math.floor(Date.now() / 1000);

    db.execute(
      `INSERT INTO annotations (
        id, book_id, user_id, type, cfi_range, selected_text,
        color, note_text, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        annotation.book_id,
        annotation.user_id,
        annotation.type,
        annotation.cfi_range,
        annotation.selected_text || null,
        annotation.color || null,
        annotation.note_text || null,
        now,
        now,
      ]
    );

    const created = this.findById(id);
    if (!created) {
      throw new Error('Failed to create annotation');
    }
    return created;
  }

  findById(id: string): Annotation | null {
    const db = this.getDb();
    const result = db.execute(
      'SELECT * FROM annotations WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    return mapRowToAnnotation(result.rows.item(0) as AnnotationRow);
  }

  findByBookId(bookId: string): Annotation[] {
    const db = this.getDb();
    const result = db.execute(
      `SELECT * FROM annotations 
       WHERE book_id = ? AND deleted_at IS NULL 
       ORDER BY created_at DESC`,
      [bookId]
    );

    const annotations: Annotation[] = [];
    if (result.rows && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        annotations.push(mapRowToAnnotation(result.rows.item(i) as AnnotationRow));
      }
    }

    return annotations;
  }

  findByUserId(userId: string): Annotation[] {
    const db = this.getDb();
    const result = db.execute(
      `SELECT * FROM annotations 
       WHERE user_id = ? AND deleted_at IS NULL 
       ORDER BY created_at DESC`,
      [userId]
    );

    const annotations: Annotation[] = [];
    if (result.rows && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        annotations.push(mapRowToAnnotation(result.rows.item(i) as AnnotationRow));
      }
    }

    return annotations;
  }

  update(id: string, updates: Partial<Annotation>): Annotation {
    const db = this.getDb();
    const now = Math.floor(Date.now() / 1000);
    
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at' && key !== 'book_id' && key !== 'user_id') {
        fields.push(`${key} = ?`);
        values.push(value !== undefined ? value : null);
      }
    });

    if (fields.length === 0) {
      const existing = this.findById(id);
      if (!existing) {
        throw new Error('Annotation not found');
      }
      return existing;
    }

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    db.execute(
      `UPDATE annotations SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    const updated = this.findById(id);
    if (!updated) {
      throw new Error('Annotation not found after update');
    }
    return updated;
  }

  delete(id: string): void {
    const db = this.getDb();
    const now = Math.floor(Date.now() / 1000);
    
    db.execute(
      'UPDATE annotations SET deleted_at = ?, updated_at = ? WHERE id = ?',
      [now, now, id]
    );
  }
}

export const annotationRepository = new AnnotationRepository();
