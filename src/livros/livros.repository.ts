import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Livro } from './livro.entity';

export interface FiltrosLivros {
  categoria?: number;
  autor?: number;
  disponivel?: boolean;
}

@Injectable()
export class LivrosRepository {
  constructor(
    @InjectRepository(Livro)
    private readonly repository: Repository<Livro>,
  ) {}

  listar(filtros: FiltrosLivros): Promise<Livro[]> {
    const consulta = this.repository
      .createQueryBuilder('livro')
      .leftJoinAndSelect('livro.autor', 'autor')
      .leftJoinAndSelect('livro.categoria', 'categoria')
      .orderBy('livro.id', 'ASC');

    if (filtros.categoria !== undefined) {
      consulta.andWhere('livro.categoria_id = :categoria', {
        categoria: filtros.categoria,
      });
    }
    if (filtros.autor !== undefined) {
      consulta.andWhere('livro.autor_id = :autor', { autor: filtros.autor });
    }
    if (filtros.disponivel !== undefined) {
      const operador = filtros.disponivel ? '>' : '<=';
      consulta.andWhere(
        `livro.exemplares ${operador} (SELECT COUNT(*) FROM emprestimos emprestimo WHERE emprestimo.livro_id = livro.id AND emprestimo.data_devolucao IS NULL)`,
      );
    }

    return consulta.getMany();
  }

  buscarPorId(id: number): Promise<Livro | null> {
    return this.repository.findOne({
      where: { id },
      relations: { autor: true, categoria: true },
    });
  }

  criar(livro: Livro): Promise<Livro> {
    return this.repository.save(livro);
  }

  contarEmprestimosAbertos(id: number): Promise<number> {
    return this.repository.manager.count('Emprestimo', {
      where: { livro: { id }, dataDevolucao: IsNull() },
    });
  }

  async excluir(livro: Livro): Promise<void> {
    await this.repository.remove(livro);
  }
}
