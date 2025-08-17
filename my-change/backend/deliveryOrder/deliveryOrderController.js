const express = require('express');
const router = express.Router();
const service = require('./deliveryOrderService');
const { authenticateToken } = require('../auth/middleware');

router.post('/', authenticateToken, (req, res) => {
  service.createOrder(req.body, req.vendor.id, (err, order) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json(order);
  });
});

router.get('/', authenticateToken, (req, res) => {
  service.getOrdersByVendor(req.vendor.id, (err, orders) => {
    if (err) return res.status(500).send(err.message);
    res.json(orders);
  });
});

module.exports = router;