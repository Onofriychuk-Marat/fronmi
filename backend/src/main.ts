import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuthUserGuard } from './user/guards/auth.quard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalGuards(new AuthUserGuard());

  const config = new DocumentBuilder()
    .setTitle('Iogru example')
    .setDescription('The iogru API description')
    .setVersion('1.0')
    .addTag('iogru')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
