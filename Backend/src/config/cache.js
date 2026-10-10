const Redis = require("ioredis").default

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME || "default",
});

redis.on("connect",()=>{
    console.log("server is connected to redis")
})

redis.on("error",(error)=>{
    console.log(error)
})

module.exports = redis