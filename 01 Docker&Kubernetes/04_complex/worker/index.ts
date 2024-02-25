import redis from "redis";

import keys from "./keys";

const redisClient = redis.createClient({
  host: keys.redisHost as string,
  port: keys.redisPort as number,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();
console.log("sub:", sub);

function fib(index: number): number {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on("message", (_channel, message) => {
  console.log("_channel:", _channel);
  redisClient.hset("values", message, String(fib(parseInt(message))));
});
sub.subscribe("insert");
