-- Snapshot of categories, menu_items, and orders from:
-- https://docs.google.com/spreadsheets/d/1ZIqes6vguWoTFnlOjIpofb3-yYl9r1JaWrDg5jYC11A/edit
-- Run in a new database after schema.sql, with foreign_keys enabled.
BEGIN TRANSACTION;

INSERT INTO categories (name, description, sort_order) VALUES
    ('Coffee', 'เครื่องดื่มจากเมล็ดกาแฟ', 1),
    ('Tea', 'ชาและชาเขียว', 2),
    ('Other', 'เครื่องดื่มอื่น ๆ ที่ไม่ใช่กาแฟหรือชา', 3);

INSERT INTO menu_items (name, category, price, is_available) VALUES
    ('Espresso', 'Coffee', 50, 1),
    ('Americano', 'Coffee', 60, 1),
    ('Latte', 'Coffee', 70, 1),
    ('Cappuccino', 'Coffee', 70, 1),
    ('Mocha', 'Coffee', 75, 0),
    ('Matcha Latte', 'Tea', 80, 1),
    ('Thai Tea', 'Tea', 55, 1),
    ('Lemon Tea', 'Tea', 50, 1),
    ('Cocoa', 'Other', 65, 1),
    ('Honey Lemon Soda', 'Other', 60, 0);

INSERT INTO orders (customer_name, menu_item_id, quantity, note, created_at) VALUES
    ('Ploy', (SELECT id FROM menu_items WHERE name = 'Latte'), 2, 'หวานน้อย', '2026-10-01 09:15'),
    ('Bank', (SELECT id FROM menu_items WHERE name = 'Americano'), 1, NULL, '2026-10-01 09:40'),
    ('Mint', (SELECT id FROM menu_items WHERE name = 'Thai Tea'), 3, 'แยกน้ำแข็ง', '2026-10-01 10:05'),
    ('Ploy', (SELECT id FROM menu_items WHERE name = 'Matcha Latte'), 1, NULL, '2026-10-02 08:55'),
    ('Ton', (SELECT id FROM menu_items WHERE name = 'Cocoa'), 2, 'ไม่ใส่วิปครีม', '2026-10-02 13:20');

COMMIT;
