module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') next()
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  next()
}
