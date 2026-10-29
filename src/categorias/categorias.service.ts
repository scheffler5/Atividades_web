import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { CategoriasRepository } from './categorias.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly categoriasRepository: CategoriasRepository) {}

  async listar(): Promise<Categoria[]> {
    return this.categoriasRepository.listar();
  }

  async buscarPorId(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.buscarPorId(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria ${id} não encontrada`);
    }
    return categoria;
  }

  async criar(dados: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasRepository.criar(dados);
  }
}
