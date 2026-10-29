import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Emprestimo } from '../emprestimos/emprestimo.entity';
import { CreateLeitorDto } from './dto/create-leitor.dto';
import { Leitor } from './leitor.entity';
import { LeitoresRepository } from './leitores.repository';

@Injectable()
export class LeitoresService {
  constructor(private readonly leitoresRepository: LeitoresRepository) {}

  async criar(dados: CreateLeitorDto): Promise<Leitor> {
    const existente = await this.leitoresRepository.buscarPorMatricula(dados.matricula);
    if (existente) {
      throw new ConflictException({
        codigo: 'MATRICULA_DUPLICADA',
        mensagem: `Matrícula ${dados.matricula} já cadastrada`,
      });
    }
    return this.leitoresRepository.criar(dados);
  }

  async buscarPorId(id: number): Promise<Leitor> {
    const leitor = await this.leitoresRepository.buscarPorId(id);
    if (!leitor) {
      throw new NotFoundException(`Leitor ${id} não encontrado`);
    }
    return leitor;
  }

  async listarEmprestimos(id: number, status?: string): Promise<Emprestimo[]> {
    if (status !== undefined && status !== 'aberto') {
      throw new BadRequestException('O filtro status aceita apenas o valor aberto');
    }
    await this.buscarPorId(id);
    return this.leitoresRepository.listarEmprestimos(id, status === 'aberto');
  }
}
