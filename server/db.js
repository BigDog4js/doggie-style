const massive = require('massive')
const config = require('../config')

const db = massive.connectSync({connectionString: config.connectionString})

module.exports = db;