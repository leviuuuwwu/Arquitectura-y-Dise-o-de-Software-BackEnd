import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Eventos Empresariales - Grupo Theta')
    .setDescription('Documentación de los endpoints para la integración con el Front-End')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();