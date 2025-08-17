const db = require("../db");
db.run(`
  CREATE TABLE IF NOT EXISTS delivery_orders (
    id TEXT PRIMARY KEY,
    vendor_id TEXT,
    delivery_date TEXT,
    subscription_type TEXT,
    total_orders INTEGER,
    file_link TEXT,
    FOREIGN KEY(vendor_id) REFERENCES vendors(id)
  )
`);

module.exports = db;