import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './autor.entity';
import { CreateAutorDto } from './dto/create-autor.dto';

@Injectable()
export class AutoresRepository {
  constructor(
    @InjectRepository(Autor)
    private readonly repository: Repository<Autor>,
  ) {}

  listar(): Promise<Autor[]> {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  buscarPorId(id: number): Promise<Autor | null> {
    return this.repository.findOneBy({ id });
  }

  criar(dados: CreateAutorDto): Promise<Autor> {
    return this.repository.save(this.repository.create(dados));
  }
}
