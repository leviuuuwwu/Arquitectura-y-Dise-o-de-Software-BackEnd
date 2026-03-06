import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  company_id: string;

  @Column({ type: 'varchar', length: 100 })
  company_name: string;

  // Relación con la tabla Usuario (el organizador)
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'organizer_id' })
  organizer: Usuario;
}