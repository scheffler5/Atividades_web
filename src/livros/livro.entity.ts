import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Autor } from '../autores/autor.entity';
import { Categoria } from '../categorias/categoria.entity';
import { Emprestimo } from '../emprestimos/emprestimo.entity';

@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'int' })
  exemplares: number;

  @ManyToOne(() => Autor, (autor) => autor.livros, { nullable: false })
  @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  @ManyToOne(() => Categoria, (categoria) => categoria.livros, { nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.livro)
  emprestimos: Emprestimo[];
}
