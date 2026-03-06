import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaEventoController } from './categoria-evento.controller';

describe('CategoriaEventoController', () => {
  let controller: CategoriaEventoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaEventoController],
    }).compile();

    controller = module.get<CategoriaEventoController>(CategoriaEventoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
