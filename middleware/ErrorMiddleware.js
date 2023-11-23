class ErrorApi extends Error {
  constructor(status, message) {
    super()
    this.status = status
    this.message = message
  }

  static badRequest(message) {
    return new ErrorApi(404, message)
  }

  static internal(message) {
    return new ErrorApi(500, message)
  }

  static forbidden(message) {
    return new ErrorApi(403, message)
  }
}

module.exports = function (error, _, res) {
  if (error instanceof ErrorApi) {
    const { message } = error
    return res.status(error.status).json({ errorMessage: message })
  } else {
    return res.status(500).json({ errorMessage: 'Unknown error' })
  }
}
