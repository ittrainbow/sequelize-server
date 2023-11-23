// const ErrorApi = require('../error')

// module.exports = function (error, _, res) {
//   if (error instanceof ErrorApi) {
//     const { message } = error
//     return res.status(error.status).json({ errorMessage: message })
//   } else {
//     return res.status(500).json({ errorMessage: 'Unknown error' })
//   }
// }
