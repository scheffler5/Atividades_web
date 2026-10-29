import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { EmprestimosService } from './emprestimos.service';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post()
  criar(@Body() dados: CreateEmprestimoDto) {
    return this.emprestimosService.criar(dados);
  }

  @Patch(':id/devolucao')
  devolver(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimosService.devolver(id);
  }
}
