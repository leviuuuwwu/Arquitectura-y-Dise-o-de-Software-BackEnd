import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid') // Esto genera el UUID automático
  user_id: string;

  @Column({ type: 'varchar', length: 100 })
  user_name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  user_email: string;

  @Column({ type: 'varchar', length: 150 })
  user_password: string;

  // Así se define la llave foránea en TypeORM
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn() // Toma el CURRENT_TIMESTAMP automático
  created_at: Date;

  @UpdateDateColumn() // Se actualiza solo cuando editas el registro
  updated_at: Date;
}