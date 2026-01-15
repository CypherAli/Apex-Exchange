-- Check orders table schema
\d orders;

-- Check if table exists
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders' 
ORDER BY ordinal_position;

-- Check sample data
SELECT COUNT(*) FROM orders;
