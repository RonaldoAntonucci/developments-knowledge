require('../start/bootstrap');

module.exports = {
  host: process.env.MONGO_HOST,
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  database: process.env.MONGO_NAME,
  port: process.env.MONGO_PORT || 27017,
};
