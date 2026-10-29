import { Injectable, NotFoundException } from '@nestjs/common';
import { LeitoresService } from '../leitores/leitores.service';
import { LivrosService } from '../livros/livros.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { Emprestimo } from './emprestimo.entity';
import {
  JaDevolvidoException,
  LimiteEmprestimosException,
  SemExemplarException,
} from './emprestimo.exceptions';
import { EmprestimosRepository } from './emprestimos.repository';

@Injectable()
export class EmprestimosService {
  constructor(
    private readonly emprestimosRepository: EmprestimosRepository,
    private readonly livrosService: LivrosService,
    private readonly leitoresService: LeitoresService,
  ) {}

  async criar(dados: CreateEmprestimoDto): Promise<Emprestimo> {
    const livro = await this.livrosService.buscarPorId(dados.livroId);
    const leitor = await this.leitoresService.buscarPorId(dados.leitorId);
    const emprestimosDoLivro =
      await this.emprestimosRepository.contarAbertosPorLivro(livro.id);

    if (emprestimosDoLivro >= livro.exemplares) {
      throw new SemExemplarException(livro.id);
    }

    const emprestimosDoLeitor =
      await this.emprestimosRepository.contarAbertosPorLeitor(leitor.id);
    if (emprestimosDoLeitor >= 3) {
      throw new LimiteEmprestimosException(leitor.id);
    }

    const dataRetirada = new Date();
    const dataPrevista = new Date(dataRetirada);
    dataPrevista.setUTCDate(dataPrevista.getUTCDate() + 14);
    const emprestimo = await this.emprestimosRepository.salvar(
      Object.assign(new Emprestimo(), {
        livro,
        leitor,
        dataRetirada,
        dataPrevista,
        dataDevolucao: null,
        multa: 0,
      }),
    );

    return this.buscarPorId(emprestimo.id);
  }

  async devolver(id: number): Promise<Emprestimo> {
    const emprestimo = await this.buscarPorId(id);
    if (emprestimo.dataDevolucao) {
      throw new JaDevolvidoException(id);
    }

    emprestimo.dataDevolucao = new Date();
    const atrasoEmDias = Math.ceil(
      (emprestimo.dataDevolucao.getTime() - emprestimo.dataPrevista.getTime()) /
        86_400_000,
    );
    emprestimo.multa = Math.max(0, atrasoEmDias);

    return this.emprestimosRepository.salvar(emprestimo);
  }

  private async buscarPorId(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimosRepository.buscarPorId(id);
    if (!emprestimo) {
      throw new NotFoundException(`Empréstimo ${id} não encontrado`);
    }
    return emprestimo;
  }
}
