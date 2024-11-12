const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 3000;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

client.on('error', (err) => console.error('Redis error:', err));

app.get('/', (req, res) => {
  client.incr('counter', (err, counter) => {
    if (err) {
      return res.status(500).send('Redis error');
    }
    res.send(`Hello from Node.js App! You are visitor number ${counter}`);
  });
});

app.listen(PORT, () => {
  console.log(`Node.js app running on http://localhost:${PORT}`);
});
