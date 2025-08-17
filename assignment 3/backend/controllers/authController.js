// controllers/authController.js
const authService = require('../services/authService.js');

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });

  authService.authenticateVendor(email, password, (err, result) => {
    if (err) return res.status(401).json({ error: err.message });
    res.json(result); // { token, vendor }
  });
}

async function registerVendor(req, res) {
  // optional: protect this route to Admin in real app
  const { name, email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });

  authService.createVendor({ name, email, password, role }, (err, vendor) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(vendor);
  });
}

module.exports = { login, registerVendor };