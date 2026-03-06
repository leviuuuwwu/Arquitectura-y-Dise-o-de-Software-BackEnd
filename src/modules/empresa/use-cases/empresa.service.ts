import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find({ relations: ['organizer'] });
  }

  create(empresa: Empresa): Promise<Empresa> {
    return this.empresaRepository.save(empresa);
  }
}