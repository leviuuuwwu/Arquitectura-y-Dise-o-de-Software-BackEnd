import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroAsistencia } from './entitites/registro-asistencia.entity';
import { RegistroAsistenciaController } from './controllers/registro-asistencia.controller';
import { RegistroAsistenciaService } from './use-cases/registro-asistencia.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroAsistencia])],
  controllers: [RegistroAsistenciaController],
  providers: [RegistroAsistenciaService],
})
export class RegistroAsistenciaModule {}