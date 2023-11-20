const ErrorApi = require('../error')

module.exports = function (err, _, res) {
  if (err instanceof ErrorApi) return res.status(err.status).json({ message: err.message })

  return res.status(500).json({ message: 'Непредвиденная ошибка!' })
}
