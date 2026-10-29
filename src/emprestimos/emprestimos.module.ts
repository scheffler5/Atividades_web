import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeitoresModule } from '../leitores/leitores.module';
import { LivrosModule } from '../livros/livros.module';
import { Emprestimo } from './emprestimo.entity';
import { EmprestimosController } from './emprestimos.controller';
import { EmprestimosRepository } from './emprestimos.repository';
import { EmprestimosService } from './emprestimos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Emprestimo]),
    LivrosModule,
    LeitoresModule,
  ],
  controllers: [EmprestimosController],
  providers: [EmprestimosService, EmprestimosRepository],
})
export class EmprestimosModule {}
