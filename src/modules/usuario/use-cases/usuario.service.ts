import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['role'] });
  }

  create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  
  async login(email: string, pass: string): Promise<any> {
    const user = await this.usuarioRepository.findOne({ 
      where: { user_email: email }, 
      relations: ['role'] 
    });

    if (user && await bcrypt.compare(pass, user.user_password)) {
      const { user_password, ...result } = user;
      return result; 
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
    await this.usuarioRepository.update(id, updateData);
    return this.findOne(id); 
  }

  async remove(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}