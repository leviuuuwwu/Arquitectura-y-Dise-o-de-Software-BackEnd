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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Echeverria16', 
      database: 'proyectocatedra',
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
