import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './swagger';
import { RequestIdMiddleware } from './shared/middlewares/request-id.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(RequestIdMiddleware);

  app.useGlobalPipes(new ValidationPipe());
  // swagger文档
  // generateDocument(app);
  await app.listen(3000);
}
bootstrap();
