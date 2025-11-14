export interface UserSettings {
  id: string;
  user_id: string;
  dark_mode: boolean;
  font_size: number;
  language: 'english' | 'vietnamese';
  openai_api_key?: string;
  created_at: number;
  updated_at: number;
}

export interface UserSettingsRow {
  id: string;
  user_id: string;
  dark_mode: number; // 0 or 1
  font_size: number;
  language: string;
  openai_api_key: string | null;
  created_at: number;
  updated_at: number;
}

export const mapRowToUserSettings = (row: Partial<UserSettingsRow>): UserSettings => ({
  id: row.id || '',
  user_id: row.user_id || '',
  dark_mode: row.dark_mode === 1,
  font_size: row.font_size || 16,
  language: row.language as UserSettings['language'] || 'english',
  openai_api_key: row.openai_api_key || undefined,
  created_at: row.created_at || 0,
  updated_at: row.updated_at || 0,  
});

