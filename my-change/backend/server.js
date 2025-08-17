const express = require('express');
const cors = require('cors');
const app = express();
const parcelRoutes = require('./parcel/parcelController');
const vendorRoutes = require('./vendor/vendorController');
const orderRoutes = require('./deliveryOrder/deliveryOrderController');
const authRoutes = require('./auth/authController');

app.use(cors());
app.use(express.json());

app.use('/parcels', parcelRoutes);
app.use('/vendors', vendorRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));