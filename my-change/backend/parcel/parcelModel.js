const db=require("../db");
//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('tech_eazy.db');

// Create parcels table
db.run(`
  CREATE TABLE IF NOT EXISTS parcels (
    tracking_id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    size TEXT NOT NULL,
    weight TEXT NOT NULL
  )
`);

module.exports = db;
