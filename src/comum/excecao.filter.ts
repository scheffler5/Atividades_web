import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExcecaoFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExcecaoFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const http = exception instanceof HttpException;
    const status = http
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const corpo = http ? exception.getResponse() : null;
    const detalhe = typeof corpo === 'object' && corpo !== null ? corpo : {};
    const mensagemBruta =
      typeof corpo === 'string'
        ? corpo
        : ((detalhe as { mensagem?: unknown; message?: unknown }).mensagem ??
          (detalhe as { message?: unknown }).message);
    const mensagem = http
      ? Array.isArray(mensagemBruta)
        ? mensagemBruta.join('; ')
        : String(mensagemBruta ?? exception.message)
      : 'Erro interno do servidor';
    const codigo = http
      ? String((detalhe as { codigo?: unknown }).codigo ?? `HTTP_${status}`)
      : 'ERRO_INTERNO';

    if (!http) {
      this.logger.error(
        `${request.method} ${request.originalUrl}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(status).json({
      sucesso: false,
      erro: { status, codigo, mensagem },
      caminho: request.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
