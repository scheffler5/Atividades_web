import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLeitorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  matricula: string;

  @IsEmail()
  @MaxLength(160)
  email: string;
}
