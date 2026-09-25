require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_CLUSTER = process.env.MONGODB_CLUSTER
let MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
let MONGODB_USER = process.env.MONGODB_USER
let MONGODB_DBNAME = process.env.MONGODB_DBNAME
let MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.wtffmwb.mongodb.net/${MONGODB_DBNAME}?appName=Fullstackopen&compressors=zlib`

module.exports = { MONGODB_URI, PORT }