const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST?.trim(),
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME?.trim() || "default",
  password: process.env.REDIS_PASSWORD?.trim(),
  lazyConnect: true,
});

redis.on("connect", () => {
  console.log("Redis TCP connection established");
});

redis.on("ready", () => {
  console.log("Redis authenticated and ready");
});

redis.on("error", (error) => {
  console.error("Redis error:", error.message);
});

redis.connect().catch((error) => {
  console.error("Redis connection failed:", error.message);
});

module.exports = redis;
