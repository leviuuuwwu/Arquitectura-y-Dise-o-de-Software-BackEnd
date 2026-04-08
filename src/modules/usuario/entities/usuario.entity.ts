import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid') 
  user_id: string;

  @Column({ type: 'varchar', length: 100 })
  user_name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  user_email: string;

  @Column({ type: 'varchar', length: 150 })
  user_password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn() 
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.user_password) {
      const salt = await bcrypt.genSalt(10);
      this.user_password = await bcrypt.hash(this.user_password, salt);
    }
  }
}