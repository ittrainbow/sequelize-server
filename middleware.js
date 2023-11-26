module.exports = function (req, res, next) {
  const { referer } = req.headers
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Origins', referer)
  next()
}
