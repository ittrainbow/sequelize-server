class AppController {
  async check(_, res) {
    return res.json('server is up')
  }
}

module.exports = new AppController()
