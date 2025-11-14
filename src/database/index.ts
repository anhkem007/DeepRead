import { open } from 'react-native-nitro-sqlite';
import { runMigrations } from './migrations/migrationRunner';

let db: ReturnType<typeof open> | null = null;

export const getDatabase = () => {
  if (db) {
    return db;
  }

  try {
    debugger
    db = open({
      name: 'DeepRead',
    });

    // Chạy migrations
    runMigrations(db);
    
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export const closeDatabase = (): void => {
  if (db) {
    db.close();
    db = null;
    console.log('Database closed');
  }
};
