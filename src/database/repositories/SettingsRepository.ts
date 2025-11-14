import { getDatabase } from '../index';
import { UserSettings, UserSettingsRow, mapRowToUserSettings } from '../models/UserSettings';
import { generateId } from '../../utils/uuid';

type Database = ReturnType<typeof import('react-native-nitro-sqlite').open>;

export class SettingsRepository {
  private getDb(): Database {
    return getDatabase();
  }

  getOrCreate(userId: string): UserSettings {
    const existing = this.findByUserId(userId);
    if (existing) {
      return existing;
    }

    // Tạo settings mặc định
    const db = this.getDb();
    const id = generateId();
    const now = Math.floor(Date.now() / 1000);

    db.execute(
      `INSERT INTO user_settings (
        id, user_id, dark_mode, font_size, language, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, userId, 0, 16, 'english', now, now]
    );

    const settings = this.findByUserId(userId);
    if (!settings) {
      throw new Error('Failed to create settings');
    }
    return settings;
  }

  findByUserId(userId: string): UserSettings | null {
    const db = this.getDb();
    const result = db.execute(
      'SELECT * FROM user_settings WHERE user_id = ?',
      [userId]
    );
    let user = result?.rows?.item(0) ;
    if (!user) {
      return null;
    }
    return mapRowToUserSettings(user as Partial<UserSettingsRow>);
  }

  update(userId: string, updates: Partial<UserSettings>): UserSettings {
    const db = this.getDb();
    const now = Math.floor(Date.now() / 1000);
    
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'user_id' && key !== 'created_at') {
        if (key === 'dark_mode') {
          fields.push(`${key} = ?`);
          values.push(value ? 1 : 0);
        } else {
          fields.push(`${key} = ?`);
          values.push(value !== undefined ? value : null);
        }
      }
    });

    if (fields.length === 0) {
      const existing = this.findByUserId(userId);
      if (!existing) {
        throw new Error('Settings not found');
      }
      return existing;
    }

    fields.push('updated_at = ?');
    values.push(now);
    values.push(userId);

    db.execute(
      `UPDATE user_settings SET ${fields.join(', ')} WHERE user_id = ?`,
      values
    );

    const updated = this.findByUserId(userId);
    if (!updated) {
      throw new Error('Settings not found after update');
    }
    return updated;
  }
}

export const settingsRepository = new SettingsRepository();
