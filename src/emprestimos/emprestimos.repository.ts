import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Emprestimo } from './emprestimo.entity';

@Injectable()
export class EmprestimosRepository {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly repository: Repository<Emprestimo>,
  ) {}

  buscarPorId(id: number): Promise<Emprestimo | null> {
    return this.repository.findOne({
      where: { id },
      relations: { livro: true, leitor: true },
    });
  }

  contarAbertosPorLivro(livroId: number): Promise<number> {
    return this.repository.count({
      where: { livro: { id: livroId }, dataDevolucao: IsNull() },
    });
  }

  contarAbertosPorLeitor(leitorId: number): Promise<number> {
    return this.repository.count({
      where: { leitor: { id: leitorId }, dataDevolucao: IsNull() },
    });
  }

  salvar(emprestimo: Emprestimo): Promise<Emprestimo> {
    return this.repository.save(emprestimo);
  }
}
