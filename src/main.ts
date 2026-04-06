import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CONFIGURACIÓN CORS (Ponlo aquí arriba, antes de Swagger y cualquier otra cosa)
  app.enableCors({
    origin: '*', // Permite peticiones de cualquier puerto (React)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization', // IMPORTANTE: Deja pasar tu Token JWT
  });

  // 2. CONFIGURACIÓN SWAGGER
  const config = new DocumentBuilder()
    .setTitle('API de Eventos Empresariales - Grupo Theta')
    .setDescription('Documentación de los endpoints para la integración con el Front-End')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 3. LEVANTAR SERVIDOR
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();