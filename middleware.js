module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') return next(res.status(200))

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  next()
}
