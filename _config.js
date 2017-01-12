var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/app_development',
  production: process.env.MONGO_URI,
  test: 'mongodb://localhost/app_test'
};

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET
};

module.exports = config;