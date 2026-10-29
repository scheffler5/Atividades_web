import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Emprestimo } from '../emprestimos/emprestimo.entity';
import { CreateLeitorDto } from './dto/create-leitor.dto';
import { Leitor } from './leitor.entity';

@Injectable()
export class LeitoresRepository {
  constructor(
    @InjectRepository(Leitor)
    private readonly repository: Repository<Leitor>,
  ) {}

  buscarPorId(id: number): Promise<Leitor | null> {
    return this.repository.findOneBy({ id });
  }

  buscarPorMatricula(matricula: string): Promise<Leitor | null> {
    return this.repository.findOneBy({ matricula });
  }

  criar(dados: CreateLeitorDto): Promise<Leitor> {
    return this.repository.save(this.repository.create(dados));
  }

  listarEmprestimos(leitorId: number, apenasAbertos: boolean): Promise<Emprestimo[]> {
    return this.repository.manager.find(Emprestimo, {
      where: {
        leitor: { id: leitorId },
        ...(apenasAbertos ? { dataDevolucao: IsNull() } : {}),
      },
      relations: { livro: true },
      order: { id: 'ASC' },
    });
  }
}
