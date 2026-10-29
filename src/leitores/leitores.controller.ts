import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLeitorDto } from './dto/create-leitor.dto';
import { LeitoresService } from './leitores.service';

@Controller('leitores')
export class LeitoresController {
  constructor(private readonly leitoresService: LeitoresService) {}

  @Post()
  criar(@Body() dados: CreateLeitorDto) {
    return this.leitoresService.criar(dados);
  }

  @Get(':id/emprestimos')
  listarEmprestimos(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status?: string,
  ) {
    return this.leitoresService.listarEmprestimos(id, status);
  }
}
