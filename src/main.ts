import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExcecaoFilter } from './comum/excecao.filter';
import { RespostaInterceptor } from './comum/resposta.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new ExcecaoFilter());
  app.useGlobalInterceptors(new RespostaInterceptor());

  const porta = app.get(ConfigService).get<number>('PORT', 3000);
  await app.listen(porta);
}

void bootstrap();
