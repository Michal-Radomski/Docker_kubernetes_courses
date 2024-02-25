const keys = {
  redisHost: process.env.REDIS_HOST as string,
  redisPort: Number(process.env.REDIS_PORT as string),
};

export default keys;
