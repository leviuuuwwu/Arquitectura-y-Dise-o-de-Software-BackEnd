import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { CategoriaEventoModule } from './modules/categoria-evento/categoria-evento.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { EventoModule } from './modules/evento/evento.module';
import { RegistroAsistenciaModule } from './modules/registro-asistencia/registro-asistencia.module';
import { APP_GUARD } from '@nestjs/core'; 
import { JwtGuard } from './modules/usuario/guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', 
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'suser',
      database: process.env.DB_NAME || 'proyectocatedra',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolesModule,
    CategoriaEventoModule,
    UsuarioModule,
    EmpresaModule,
    EventoModule,
    RegistroAsistenciaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}