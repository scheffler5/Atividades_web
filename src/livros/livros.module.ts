import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from '../autores/autores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { Livro } from './livro.entity';
import { LivrosController } from './livros.controller';
import { LivrosRepository } from './livros.repository';
import { LivrosService } from './livros.service';

@Module({
  imports: [TypeOrmModule.forFeature([Livro]), AutoresModule, CategoriasModule],
  controllers: [LivrosController],
  providers: [LivrosService, LivrosRepository],
  exports: [LivrosService],
})
export class LivrosModule {}
