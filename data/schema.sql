PRAGMA foreign_keys = ON;

CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL COLLATE NOCASE UNIQUE,
    description TEXT,
    sort_order INTEGER NOT NULL
) STRICT;

CREATE TABLE menu_items (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL COLLATE NOCASE UNIQUE,
    category TEXT NOT NULL REFERENCES categories(name)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    price REAL NOT NULL CHECK (price > 0),
    is_available INTEGER NOT NULL CHECK (is_available IN (0, 1))
) STRICT;

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    menu_item_id INTEGER NOT NULL REFERENCES menu_items(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 5),
    note TEXT,
    created_at TEXT NOT NULL
) STRICT;
