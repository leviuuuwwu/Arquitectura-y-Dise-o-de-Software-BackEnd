import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
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

  // Endpoint de Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const user = await this.usuarioService.login(body.user_email, body.user_password);
    
    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
    
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Usuario>) {
    return this.usuarioService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}