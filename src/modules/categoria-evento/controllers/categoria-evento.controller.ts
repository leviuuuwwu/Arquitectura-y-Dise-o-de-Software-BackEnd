import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriaEventoService } from '../use-cases/categoria-evento.service';
import { CategoriaEvento } from '../entities/categoria-evento.entity';

@Controller('categorias') // endpoint: http://localhost:3000/categorias
export class CategoriaEventoController {
  constructor(private readonly categoriaService: CategoriaEventoService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Post()
  create(@Body() categoria: CategoriaEvento) {
    return this.categoriaService.create(categoria);
  }
}