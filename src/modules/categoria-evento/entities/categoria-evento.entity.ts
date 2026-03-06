import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoria_evento') 
export class CategoriaEvento {
  @PrimaryGeneratedColumn('increment')
  category_id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  category_name: string;

  @Column({ type: 'text', nullable: true })
  category_description: string;
}