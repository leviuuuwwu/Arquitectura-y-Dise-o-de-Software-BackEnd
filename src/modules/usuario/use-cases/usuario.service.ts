import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['role'] });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(nuevoUsuario);
  }
}