import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) { }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['role'] });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usuarioRepository.findOne({
      where: { user_email: email },
      relations: ['role']
    });

    // Validamos que el usuario exista y comparamos la contraseña con el hash
    if (user && await bcrypt.compare(pass, user.user_password)) {
      const payload = {
        sub: user.user_id,
        email: user.user_email,
        role: user.role.role_name
      };

      return {
        user_id: user.user_id,
        user_name: user.user_name,
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { user_id: id },
      relations: ['role']
    });
    if (!usuario) {
      throw new Error(`Usuario with id ${id} not found`);
    }
    return usuario;
  }

  async update(id: string, updateData: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateData);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}