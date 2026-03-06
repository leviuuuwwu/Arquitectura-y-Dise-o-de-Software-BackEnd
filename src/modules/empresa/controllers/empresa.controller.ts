import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmpresaService } from '../use-cases/empresa.service';
import { Empresa } from '../entities/empresa.entity';

@Controller('empresas') // endpoint: http://localhost:3000/empresas
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Post()
  create(@Body() empresa: Empresa) {
    return this.empresaService.create(empresa);
  }
}