import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { EventoController } from './controllers/evento.controller';
import { EventoService } from './use-cases/evento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],
  controllers: [EventoController],
  providers: [EventoService],
})
export class EventoModule {}