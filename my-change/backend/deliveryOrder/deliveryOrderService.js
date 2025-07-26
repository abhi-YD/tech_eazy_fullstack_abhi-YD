const db = require("./deliveryOrderModel");
const { v4: uuidv4 } = require("uuid");

function createOrder(data, callback) {
  const id = uuidv4();
  const { vendor_id, date, subscription_type, total_orders, file_link } = data;

  const stmt = db.prepare(`
    INSERT INTO delivery_orders (id, vendor_id, date, subscription_type, total_orders, file_link)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(id, vendor_id, date, subscription_type, total_orders, file_link, (err) => {
    if (err) return callback(err);
    callback(null, { id, ...data });
  });
}

function getOrdersByVendor(vendor_id, callback) {
  db.all('SELECT * FROM delivery_orders WHERE vendor_id = ?', [vendor_id], callback);
}

module.exports = {
  createOrder,
  getOrdersByVendor,
};  
