import { createServer } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default async (req, res) => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Eligibility API')
    .setDescription('API to validate customer eligibilities')
    .setVersion('1.0')
    .addTag('Eligibility')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  app.enableCors();
  await app.init();
  const server = createServer(app.getHttpAdapter().getInstance());
  server.emit('request', req, res);
};
