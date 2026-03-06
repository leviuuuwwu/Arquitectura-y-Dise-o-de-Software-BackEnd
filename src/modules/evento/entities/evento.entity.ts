import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriaEvento } from '../../categoria-evento/entities/categoria-evento.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';

@Entity('evento') // Debe coincidir con el nombre de la tabla en postgres
export class Evento {
  @PrimaryGeneratedColumn('uuid')
  event_id: string;

  @Column({ type: 'varchar', length: 100 })
  event_name: string;

  // 1. Llave foránea hacia Categoria_Evento
  @ManyToOne(() => CategoriaEvento)
  @JoinColumn({ name: 'event_category' })
  category: CategoriaEvento;

  @Column({ type: 'varchar', length: 150, nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string;

  @Column({ type: 'int', nullable: true })
  max_attendanse: number; // Alejo se equivocó en el SQL, lo dejo así porque sino el TypeORM tronará

  // 2. Llave foránea hacia Usuario
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'organizer_id' })
  organizer: Usuario;

  // 3. Llave foránea hacia Empresa
  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'company_id' })
  company: Empresa;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}