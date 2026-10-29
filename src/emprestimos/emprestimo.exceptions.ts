import { HttpException, HttpStatus } from '@nestjs/common';

abstract class RegraEmprestimoException extends HttpException {
  readonly codigo: string;

  constructor(codigo: string, mensagem: string) {
    super({ codigo, mensagem }, HttpStatus.CONFLICT);
    this.codigo = codigo;
  }
}

export class SemExemplarException extends RegraEmprestimoException {
  constructor(livroId: number) {
    super('SEM_EXEMPLAR', `Livro ${livroId} sem exemplar disponível`);
  }
}

export class LimiteEmprestimosException extends RegraEmprestimoException {
  constructor(leitorId: number) {
    super(
      'LIMITE_EMPRESTIMOS',
      `Leitor ${leitorId} já possui 3 empréstimos em aberto`,
    );
  }
}

export class JaDevolvidoException extends RegraEmprestimoException {
  constructor(emprestimoId: number) {
    super('JA_DEVOLVIDO', `Empréstimo ${emprestimoId} já foi devolvido`);
  }
}
