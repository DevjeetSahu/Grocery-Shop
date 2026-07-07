import fs from 'fs';
import path from 'path';

// Run with: node scripts/csv_to_sql.js

const CSV_FILE = path.join(process.cwd(), 'inventory.csv');
const SQL_FILE = path.join(process.cwd(), 'supabase', 'import_inventory.sql');

if (!fs.existsSync(CSV_FILE)) {
  console.error(`❌ Error: Could not find ${CSV_FILE}`);
  console.log('Please save your Excel file as inventory.csv in the shop folder.');
  process.exit(1);
}

const csv = fs.readFileSync(CSV_FILE, 'utf-8');
const lines = csv.split('\n').filter(line => line.trim() !== '');

// Skip header row
const dataRows = lines.slice(1);

let sqlOutput = `-- ===========================================\n`;
sqlOutput += `-- Auto-generated from inventory.csv\n`;
sqlOutput += `-- ===========================================\n\n`;

// 1. First, make sure all categories exist
const uniqueCategories = [...new Set(dataRows.map(row => row.split(',')[1].trim()))];
sqlOutput += `-- 1. Insert Categories (Ignores duplicates automatically)\n`;
sqlOutput += `INSERT INTO categories (name, slug) VALUES\n`;
const categoryValues = uniqueCategories.map(cat => `  ('${cat.replace(/'/g, "''")}', '${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}')`);
sqlOutput += categoryValues.join(',\n');
sqlOutput += `\nON CONFLICT (name) DO NOTHING;\n\n`;

// 2. Insert products
sqlOutput += `-- 2. Insert Products\n`;
sqlOutput += `INSERT INTO products (name, category_id, price, quantity, is_available, description) VALUES\n`;

const productValues = dataRows.map(row => {
  // Assuming CSV format: Name, Category, Price, Quantity, Available, Description
  const [name, category, price, quantity, available, description] = row.split(',').map(s => s?.trim() || '');
  
  const cleanName = name.replace(/'/g, "''");
  const cleanCategory = category.replace(/'/g, "''");
  const cleanPrice = parseFloat(price) || 0;
  const cleanQuantity = quantity.replace(/'/g, "''");
  const isAvailable = available?.toUpperCase() === 'TRUE' || available === '1';
  const cleanDesc = description ? `'${description.replace(/'/g, "''")}'` : 'NULL';

  return `  ('${cleanName}', (SELECT id FROM categories WHERE name = '${cleanCategory}'), ${cleanPrice}, '${cleanQuantity}', ${isAvailable}, ${cleanDesc})`;
});

sqlOutput += productValues.join(',\n');
sqlOutput += `\nON CONFLICT (name, quantity) DO UPDATE SET price = EXCLUDED.price, is_available = EXCLUDED.is_available, description = EXCLUDED.description;\n`;

fs.writeFileSync(SQL_FILE, sqlOutput);

console.log(`✅ Success! Generated ${SQL_FILE}`);
console.log(`You can now copy the contents of supabase/import_inventory.sql and run it in the Supabase SQL Editor.`);
