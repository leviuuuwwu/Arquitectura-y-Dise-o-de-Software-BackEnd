import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { CategoriaEventoModule } from './modules/categoria-evento/categoria-evento.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { EventoModule } from './modules/evento/evento.module';
import { RegistroAsistenciaModule } from './modules/registro-asistencia/registro-asistencia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'suser',
      database: 'ProyectoCatedra',
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
})
export class AppModule { }