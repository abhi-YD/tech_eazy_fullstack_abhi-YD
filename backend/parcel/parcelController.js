const express = require("express");
const router = express.Router();
const service = require("./parcelService.js");

// Create parcel
router.post("/", (req, res) => {
  service.createParcel(req.body, (err, parcel) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json(parcel);
  });
});

// Get all parcels
router.get("/", (req, res) => {
  service.getAllParcels((err, parcels) => {
    if (err) return res.status(500).send(err.message);
    res.json(parcels);
  });
});

// Get parcel by ID
router.get("/:id", (req, res) => {
  service.getParcelById(req.params.id, (err, parcel) => {
    if (err || !parcel) return res.status(404).send("Parcel not found");
    res.json(parcel);
  });
});

// Update parcel
router.put("/:id", (req, res) => {
  service.updateParcel(req.params.id, req.body, (err, updatedParcel) => {
    if (err) return res.status(500).send(err.message);
    res.json(updatedParcel);
  });
});

// Delete parcel
router.delete("/:id", (req, res) => {
  service.deleteParcel(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json(result); // { message: "Deleted successfully" }
  });
});

module.exports = router;