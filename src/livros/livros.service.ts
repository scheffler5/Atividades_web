import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AutoresService } from '../autores/autores.service';
import { CategoriasService } from '../categorias/categorias.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from './livro.entity';
import { FiltrosLivros, LivrosRepository } from './livros.repository';

@Injectable()
export class LivrosService {
  constructor(
    private readonly livrosRepository: LivrosRepository,
    private readonly autoresService: AutoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async listar(filtrosBrutos: Record<string, string>): Promise<Livro[]> {
    const filtros: FiltrosLivros = {};

    if (filtrosBrutos.categoria !== undefined) {
      filtros.categoria = this.validarIdFiltro(
        filtrosBrutos.categoria,
        'categoria',
      );
    }
    if (filtrosBrutos.autor !== undefined) {
      filtros.autor = this.validarIdFiltro(filtrosBrutos.autor, 'autor');
    }
    if (filtrosBrutos.disponivel !== undefined) {
      if (!['true', 'false'].includes(filtrosBrutos.disponivel)) {
        throw new BadRequestException('O filtro disponivel deve ser true ou false');
      }
      filtros.disponivel = filtrosBrutos.disponivel === 'true';
    }

    return this.livrosRepository.listar(filtros);
  }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livrosRepository.buscarPorId(id);
    if (!livro) {
      throw new NotFoundException(`Livro ${id} não encontrado`);
    }
    return livro;
  }

  async criar(dados: CreateLivroDto): Promise<Livro> {
    const autor = await this.autoresService.buscarPorId(dados.autorId);
    const categoria = await this.categoriasService.buscarPorId(dados.categoriaId);
    const livro = await this.livrosRepository.criar(
      Object.assign(new Livro(), {
        titulo: dados.titulo,
        exemplares: dados.exemplares,
        autor,
        categoria,
      }),
    );
    return this.buscarPorId(livro.id);
  }

  async atualizar(id: number, dados: UpdateLivroDto): Promise<Livro> {
    const livro = await this.buscarPorId(id);
    Object.assign(livro, {
      titulo: dados.titulo ?? livro.titulo,
      exemplares: dados.exemplares ?? livro.exemplares,
    });
    if (dados.autorId !== undefined) {
      livro.autor = await this.autoresService.buscarPorId(dados.autorId);
    }
    if (dados.categoriaId !== undefined) {
      livro.categoria = await this.categoriasService.buscarPorId(dados.categoriaId);
    }
    await this.livrosRepository.criar(livro);
    return this.buscarPorId(id);
  }

  async excluir(id: number): Promise<void> {
    const livro = await this.buscarPorId(id);
    const abertos = await this.livrosRepository.contarEmprestimosAbertos(id);
    if (abertos > 0) {
      throw new ConflictException({
        codigo: 'LIVRO_COM_EMPRESTIMO',
        mensagem: `Livro ${id} possui empréstimo em aberto`,
      });
    }
    await this.livrosRepository.excluir(livro);
  }

  private validarIdFiltro(valor: string, nome: string): number {
    if (!/^[1-9]\d*$/.test(valor)) {
      throw new BadRequestException(`O filtro ${nome} deve ser um inteiro positivo`);
    }
    return Number(valor);
  }
}
