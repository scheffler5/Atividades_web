import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leitor } from './leitor.entity';
import { LeitoresController } from './leitores.controller';
import { LeitoresRepository } from './leitores.repository';
import { LeitoresService } from './leitores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Leitor])],
  controllers: [LeitoresController],
  providers: [LeitoresService, LeitoresRepository],
  exports: [LeitoresService],
})
export class LeitoresModule {}
