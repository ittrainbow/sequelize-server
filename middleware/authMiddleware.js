// const jwt = require('jsonwebtoken')

// module.exports = function (req, res, next) {
//   if (req.method !== 'GET' || req.method !== 'POST') next()

//   console.log(100, req.headers)
//   const { authorization } = req.headers
//   console.log(101, authorization)
//   try {
//     const token = authorization && authorization.split(' ').at(-1)
//     console.log(200, token)
//     if (!token) return res.status(401).json({ message: 'User not authorized' })
//     // if (!token) return res.json({ errorMessage: 'User not authorized' })
//     const decoded = jwt.verify(token, process.env.SECRET_KEY)
//     req.user = decoded
//     console.log(201)
//     next()
//     console.log(202)
//   } catch (error) {
//     // res.status(401).json({ message: 'User not authorized' })
//     res.json({ errorMessage: 'User not authorized' })
//   }
// }
