import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment') 
  role_id: number;

  @Column({ type: 'varchar', length: 100 })
  role_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  role_description: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  role_tasks: string;
}