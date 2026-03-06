import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Evento } from '../../evento/entities/evento.entity';

@Entity('registro_asistencia')
export class RegistroAsistencia {
  @PrimaryGeneratedColumn('uuid')
  register_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'user_id' })
  user: Usuario;

  @ManyToOne(() => Evento)
  @JoinColumn({ name: 'event_id' })
  event: Evento;

  @Column({ type: 'varchar', length: 50, nullable: true })
  state: string;

  @CreateDateColumn()
  register_date: Date;
}