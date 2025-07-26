const db=require("../db"); //reuse Sqlite DB connection
db.run(`
    CREATE TABLE IF NOT EXISTS vendors(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);
module.exports = db;
// This file defines the vendor model and creates the vendors table if it does not exist.