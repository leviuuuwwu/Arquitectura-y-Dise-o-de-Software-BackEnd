import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventoService } from '../use-cases/evento.service';
import { Evento } from '../entities/evento.entity';

@Controller('eventos') // endpoint: http://localhost:3000/eventos
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Post()
  create(@Body() evento: Evento) {
    return this.eventoService.create(evento);
  }
}