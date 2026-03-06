import { Controller, Get, Post, Body } from '@nestjs/common';
import { RolesService } from '../use-cases/roles.service';
import { Role } from '../entities/role.entity';

@Controller('roles') // endpoint: http://localhost:3000/roles
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  create(@Body() role: Role) {
    return this.rolesService.create(role);
  }
}