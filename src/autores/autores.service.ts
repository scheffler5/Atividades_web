import { Injectable, NotFoundException } from '@nestjs/common';
import { Autor } from './autor.entity';
import { AutoresRepository } from './autores.repository';
import { CreateAutorDto } from './dto/create-autor.dto';

@Injectable()
export class AutoresService {
  constructor(private readonly autoresRepository: AutoresRepository) {}

  async listar(): Promise<Autor[]> {
    return this.autoresRepository.listar();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autoresRepository.buscarPorId(id);
    if (!autor) {
      throw new NotFoundException(`Autor ${id} não encontrado`);
    }
    return autor;
  }

  async criar(dados: CreateAutorDto): Promise<Autor> {
    return this.autoresRepository.criar(dados);
  }
}
