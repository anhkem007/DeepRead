export interface User {
  id: string;
  created_at: number;
  updated_at: number;
  last_login_at?: number;
}

export interface UserRow {
  id: string;
  created_at: number;
  updated_at: number;
  last_login_at: number | null;
}

export const mapRowToUser = (row: UserRow): User => ({
  id: row.id,
  created_at: row.created_at,
  updated_at: row.updated_at,
  last_login_at: row.last_login_at || undefined,
});

