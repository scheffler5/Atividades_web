import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriasRepository {
  constructor(
    @InjectRepository(Categoria)
    private readonly repository: Repository<Categoria>,
  ) {}

  listar(): Promise<Categoria[]> {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  buscarPorId(id: number): Promise<Categoria | null> {
    return this.repository.findOneBy({ id });
  }

  criar(dados: CreateCategoriaDto): Promise<Categoria> {
    return this.repository.save(this.repository.create(dados));
  }
}
