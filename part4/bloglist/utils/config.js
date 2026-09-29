require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_CLUSTER = process.env.MONGODB_CLUSTER
let MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
let MONGODB_USER = process.env.MONGODB_USER
let MONGODB_DBNAME = process.env.MONGODB_DBNAME
let TEST_MONGODB_DBNAME = process.env.TEST_MONGODB_DBNAME

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.wtffmwb.mongodb.net/${TEST_MONGODB_DBNAME}?appName=Fullstackopen&retryWrites=true&w=majority`
  : `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.wtffmwb.mongodb.net/${MONGODB_DBNAME}?appName=Fullstackopen&compressors=zlib`

module.exports = { MONGODB_URI, PORT }