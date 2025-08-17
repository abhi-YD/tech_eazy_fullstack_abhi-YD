// controllers/deliveryController.js
const deliveryService = require('../services/deliveryService.js');

function uploadFile(req, res) {
  // multer has saved file and added req.file
  if (!req.file) return res.status(400).json({ error: 'File required' });

  const vendor_id = req.user.id;
  const fileLink = `/uploads/${req.file.filename}`; // relative path to the uploaded file

  // optional: parse file and create orders in DB; for now save metadata record
  const body = {
    vendor_id,
    order_date: req.body.order_date || new Date().toISOString().split('T')[0],
    subscription_type: req.body.subscription_type || 'NORMAL',
    total_orders: parseInt(req.body.total_orders || '0', 10),
    file_link: fileLink
  };

  deliveryService.createOrder(body, (err, order) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(order);
  });
}

function listOrders(req, res) {
  const user = req.user;
  deliveryService.listByUser(user, (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(orders);
  });
}

function todayOrders(req, res) {
  deliveryService.today((err, orders) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(orders);
  });
}

module.exports = { uploadFile, listOrders, todayOrders };