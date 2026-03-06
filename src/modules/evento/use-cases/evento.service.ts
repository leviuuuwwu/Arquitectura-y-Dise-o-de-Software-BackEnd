import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from '../entities/evento.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
  ) {}

  findAll(): Promise<Evento[]> {
    // Pedimos que nos traiga las 3 relaciones completas
    return this.eventoRepository.find({ 
      relations: ['category', 'organizer', 'company'] 
    });
  }

  create(evento: Evento): Promise<Evento> {
    return this.eventoRepository.save(evento);
  }
}