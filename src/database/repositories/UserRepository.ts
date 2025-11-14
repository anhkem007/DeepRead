import { getDatabase } from '../index';
import { User, UserRow, mapRowToUser } from '../models/User';
import { generateId } from '../../utils/uuid';

type Database = ReturnType<typeof import('react-native-nitro-sqlite').open>;

export class UserRepository {
  private getDb(): Database {
    return getDatabase();
  }

  createOrGet(userId?: string): User {
    if (userId) {
      const existing = this.findById(userId);
      if (existing) {
        // Update last login
        this.updateLastLogin(userId);
        return existing;
      }
    }

    const db = this.getDb();
    const id = userId || generateId();
    const now = Math.floor(Date.now() / 1000);

    db.execute(
      `INSERT OR IGNORE INTO users (id, created_at, updated_at, last_login_at) 
       VALUES (?, ?, ?, ?)`,
      [id, now, now, now]
    );

    const user = this.findById(id);
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  findById(id: string): User | null {
    const db = this.getDb();
    const result = db.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    return mapRowToUser(result.rows.item(0) as UserRow);
  }

  updateLastLogin(userId: string): void {
    const db = this.getDb();
    const now = Math.floor(Date.now() / 1000);
    
    db.execute(
      'UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?',
      [now, now, userId]
    );
  }
}

export const userRepository = new UserRepository();
