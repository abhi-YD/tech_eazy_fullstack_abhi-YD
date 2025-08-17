// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// routers
const authRoutes = require('./routes/authRoutes.js');
const vendorRoutes = require('./routes/vendorRoutes.js');
const parcelRoutes = require('./routes/parcelRoutes.js');
const deliveryRoutes = require('./routes/deliveryRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/auth', authRoutes);
app.use('/vendors', vendorRoutes);
app.use('/parcels', parcelRoutes);
app.use('/delivery-orders', deliveryRoutes);

// generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));