import { Test, TestingModule } from '@nestjs/testing';
import { RegistroAsistenciaController } from './registro-asistencia.controller';

describe('RegistroAsistenciaController', () => {
  let controller: RegistroAsistenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroAsistenciaController],
    }).compile();

    controller = module.get<RegistroAsistenciaController>(RegistroAsistenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
