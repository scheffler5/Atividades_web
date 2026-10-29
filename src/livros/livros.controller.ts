import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { LivrosService } from './livros.service';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get()
  listar(@Query() filtros: Record<string, string>) {
    return this.livrosService.listar(filtros);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.buscarPorId(id);
  }

  @Post()
  criar(@Body() dados: CreateLivroDto) {
    return this.livrosService.criar(dados);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateLivroDto,
  ) {
    return this.livrosService.atualizar(id, dados);
  }

  @Delete(':id')
  @HttpCode(204)
  excluir(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.excluir(id);
  }
}
