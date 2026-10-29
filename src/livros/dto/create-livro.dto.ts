import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateLivroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titulo: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  exemplares: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  autorId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoriaId: number;
}
