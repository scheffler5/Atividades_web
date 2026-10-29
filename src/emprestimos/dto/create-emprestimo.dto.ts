import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateEmprestimoDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  livroId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  leitorId: number;
}
