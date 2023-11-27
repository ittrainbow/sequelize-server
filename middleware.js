module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authentication')
    res.setHeader('Access-Control-Allow-Origin', '*')
    next(res.status(200))
  }
  next()
}
