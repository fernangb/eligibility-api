const { createServer } = require('http');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

module.exports = async (req, res) => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const server = createServer(app.getHttpAdapter().getInstance());
  server.emit('request', req, res);
};
