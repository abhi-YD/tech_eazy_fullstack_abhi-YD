const { verifyToken } = require('./jwt');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  verifyToken(token, (err, vendor) => {
    if (err) return res.sendStatus(403);
    req.vendor = vendor;
    next();
  });
}

module.exports = { authenticateToken };