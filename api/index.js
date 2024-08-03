import { createServer } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default async (req, res) => {
  // Cria a aplicação NestJS
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Eligibility API')
    .setDescription('API to validate customer eligibilities')
    .setVersion('1.0')
    .addTag('Eligibility')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Habilita CORS
  app.enableCors();

  // Inicializa a aplicação
  await app.init();

  // Cria um servidor HTTP e processa as requisições
  const server = createServer(app.getHttpAdapter().getInstance());
  server.emit('request', req, res);
};
