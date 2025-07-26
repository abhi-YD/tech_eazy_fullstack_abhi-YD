const jwt = require("jsonwebtoken");
const SECRET = "my_secret_key"; // put this in .env for real app

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
}

function verifyToken(token, callback) {
  return jwt.verify(token, SECRET, callback);
}

module.exports = { generateToken, verifyToken };