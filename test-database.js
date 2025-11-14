// Test script to verify database initialization
const { getDatabase } = require('./src/database');

try {
  console.log('Testing database initialization...');
  const db = getDatabase();
  console.log('✅ Database initialized successfully!');
  
  // Test a simple query
  const result = db.execute('SELECT name FROM sqlite_master WHERE type="table"');
  console.log('✅ Query executed successfully!');
  console.log('Available tables:', result.rows.length);
  
  // Test migration table
  const migrationResult = db.execute('SELECT version FROM migrations ORDER BY version');
  console.log('✅ Migration query executed successfully!');
  console.log('Applied migrations:', migrationResult.rows.length);
  
} catch (error) {
  console.error('❌ Database test failed:', error.message);
  process.exit(1);
}