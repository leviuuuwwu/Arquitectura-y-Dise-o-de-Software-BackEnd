import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEvento } from './entities/categoria-evento.entity';
import { CategoriaEventoController } from './controllers/categoria-evento.controller';
import { CategoriaEventoService } from './use-cases/categoria-evento.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEvento])],
  controllers: [CategoriaEventoController],
  providers: [CategoriaEventoService],
})
export class CategoriaEventoModule {}