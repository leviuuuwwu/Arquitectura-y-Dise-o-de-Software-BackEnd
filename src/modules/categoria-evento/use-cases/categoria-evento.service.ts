import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaEvento } from '../entities/categoria-evento.entity';

@Injectable()
export class CategoriaEventoService {
  constructor(
    @InjectRepository(CategoriaEvento)
    private categoriaRepository: Repository<CategoriaEvento>,
  ) {}

  findAll(): Promise<CategoriaEvento[]> {
    return this.categoriaRepository.find();
  }

  create(categoria: CategoriaEvento): Promise<CategoriaEvento> {
    return this.categoriaRepository.save(categoria);
  }
}