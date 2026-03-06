import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaEventoService } from './categoria-evento.service';

describe('CategoriaEventoService', () => {
  let service: CategoriaEventoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaEventoService],
    }).compile();

    service = module.get<CategoriaEventoService>(CategoriaEventoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
