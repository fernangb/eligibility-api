import { createServer } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/app.module';

export default async (req, res) => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Eligibility API')
    .setDescription('API to validate customer eligibilities')
    .setVersion('1.0')
    .addTag('Eligibility')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.init();

  const server = createServer(app.getHttpAdapter().getInstance());
  server.emit('request', req, res);
};
