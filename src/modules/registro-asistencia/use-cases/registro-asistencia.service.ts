import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroAsistencia } from '../entitites/registro-asistencia.entity';

@Injectable()
export class RegistroAsistenciaService {
  constructor(
    @InjectRepository(RegistroAsistencia)
    private registroRepository: Repository<RegistroAsistencia>,
  ) {}

  findAll(): Promise<RegistroAsistencia[]> {
    return this.registroRepository.find({ relations: ['user', 'event'] });
  }

  create(registro: RegistroAsistencia): Promise<RegistroAsistencia> {
    return this.registroRepository.save(registro);
  }
}