import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegistroAsistenciaService } from '../use-cases/registro-asistencia.service';
import { RegistroAsistencia } from '../entitites/registro-asistencia.entity';

@Controller('registros')
export class RegistroAsistenciaController {
  constructor(private readonly registroService: RegistroAsistenciaService) {}

  @Get()
  findAll() {
    return this.registroService.findAll();
  }

  @Post()
  create(@Body() registro: RegistroAsistencia) {
    return this.registroService.create(registro);
  }
}