const dotenv = require("dotenv");
dotenv.config();
const { Redis } = require("ioredis");
const client = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host

  password: process.env.REDIS_PASSWORD,
});


module.exports = client;
