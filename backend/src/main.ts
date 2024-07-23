import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger-setup';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001',
      credentials: true,
    },
  });
  app.setGlobalPrefix('api'); // Set the global prefix for all routes

  setupSwagger(app);
  app.use(bodyParser.json({ limit: '1mb' }));

  await app.listen(3000);
}
bootstrap();
