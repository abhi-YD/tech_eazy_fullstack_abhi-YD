// controllers/parcelController.js
const parcelService = require('../services/parcelService.js');

function trackParcel(req, res) {
  const id = req.params.id;
  parcelService.getByTrackingId(id, (err, parcel) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!parcel) return res.status(404).json({ error: 'Parcel not found' });
    res.json(parcel);
  });
}

function listParcels(req, res) {
  parcelService.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

function createParcel(req, res) {
  // vendor id is in req.user.id
  const vendor_id = req.user.id;
  parcelService.create(req.body, vendor_id, (err, parcel) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(parcel);
  });
}

function updateParcel(req, res) {
  const id = req.params.id;
  const data = req.body;
  parcelService.update(id, data, (err, updated) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(updated);
  });
}

function deleteParcel(req, res) {
  const id = req.params.id;
  parcelService.remove(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
}

module.exports = { trackParcel, listParcels, createParcel, updateParcel, deleteParcel };