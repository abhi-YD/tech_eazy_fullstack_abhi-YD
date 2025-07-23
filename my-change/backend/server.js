const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const parcelRoutes = require("./parcel/parcelController");

const app = express();
app.use(cors());
app.use(bodyParser.json());
//not required but.
app.use(express.json());

app.use("/parcels", parcelRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});