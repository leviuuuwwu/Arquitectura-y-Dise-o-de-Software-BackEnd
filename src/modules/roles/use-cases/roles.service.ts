import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const count = await this.rolesRepository.count();
    
    if (count === 0) {
      console.log('🌱 Sembrando roles por defecto en la base de datos...');
      
      await this.rolesRepository.save([
        { role_name: 'Administrador', description: 'Control total del sistema' },
        { role_name: 'Organizador', description: 'Crea y gestiona eventos' },
        { role_name: 'Attendee', description: 'Asistente a los eventos' },
      ]);
      
      console.log('✅ Roles creados exitosamente.');
    }
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  create(role: Role): Promise<Role> {
    const nuevoRol = this.rolesRepository.create(role);
    return this.rolesRepository.save(nuevoRol);
  }
}