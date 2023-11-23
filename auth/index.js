const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method !== 'GET' || req.method !== 'POST') next()

  const { authorization } = req.headers
  try {
    const token = authorization && authorization.split(' ').at(-1)
    console.log(200, token)
    if (!token) return res.status(401).json({ message: 'User not authorized' })
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    console.log(201, decoded)
    req.user = jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (error) {
    res.status(401).json({ message: 'User not authorized' })
  }
}
