import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Leitor } from '../leitores/leitor.entity';
import { Livro } from '../livros/livro.entity';

@Entity('emprestimos')
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Livro, (livro) => livro.emprestimos, { nullable: false })
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @ManyToOne(() => Leitor, (leitor) => leitor.emprestimos, { nullable: false })
  @JoinColumn({ name: 'leitor_id' })
  leitor: Leitor;

  @Column({ name: 'data_retirada', type: 'datetime' })
  dataRetirada: Date;

  @Column({ name: 'data_prevista', type: 'datetime' })
  dataPrevista: Date;

  @Column({ name: 'data_devolucao', type: 'datetime', nullable: true })
  dataDevolucao: Date | null;

  @Column({ type: 'real', default: 0 })
  multa: number;
}
