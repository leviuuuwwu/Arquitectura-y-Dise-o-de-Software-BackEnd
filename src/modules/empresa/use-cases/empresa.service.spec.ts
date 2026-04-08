import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroAsistenciaService } from './registro-asistencia.service';
import { RegistroAsistencia } from '../entitites/registro-asistencia.entity';
import { Evento } from '../../evento/entities/evento.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';

describe('RegistroAsistenciaService (Integración)', () => {
  let service: RegistroAsistenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [RegistroAsistencia, Evento, Usuario, Empresa],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([RegistroAsistencia, Evento, Usuario, Empresa]),
      ],
      providers: [RegistroAsistenciaService],
    }).compile();

    service = module.get<RegistroAsistenciaService>(RegistroAsistenciaService);
  });

  it('debería estar definido el servicio de asistencia', () => {
    expect(service).toBeDefined();
  });

  it('debería retornar un arreglo al buscar asistentes', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
  });
});