import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emprestimo } from '../emprestimos/emprestimo.entity';

@Entity('leitores')
export class Leitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nome: string;

  @Column({ length: 30, unique: true })
  matricula: string;

  @Column({ length: 160 })
  email: string;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.leitor)
  emprestimos: Emprestimo[];
}
