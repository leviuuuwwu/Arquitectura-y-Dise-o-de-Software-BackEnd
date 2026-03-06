import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuarioService } from '../use-cases/usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios') // endpoint: http://localhost:3000/usuarios
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }
}