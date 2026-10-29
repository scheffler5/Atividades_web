import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/create-autor.dto';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Get()
  listar() {
    return this.autoresService.listar();
  }

  @Post()
  criar(@Body() dados: CreateAutorDto) {
    return this.autoresService.criar(dados);
  }
}
