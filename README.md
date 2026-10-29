# API REST da Biblioteca

API de uma biblioteca escolar construída com NestJS, TypeORM e SQLite. Não exige autenticação.

## Modelo de dados

O diagrama ER está em [`docs/modelo.png`](docs/modelo.png), e sua fonte editável em [`docs/modelo.dbml`](docs/modelo.dbml).

**Por que empréstimo é uma entidade própria?** O empréstimo possui atributos próprios, como datas de retirada, previsão, devolução e multa, que não pertencem ao leitor nem ao livro. Além disso, um mesmo leitor pode pegar o mesmo livro várias vezes, e cada ocorrência precisa ser identificada e controlada separadamente.

Relacionamentos:

- Autor 1:N Livro; Categoria 1:N Livro.
- Livro 1:N Empréstimo; Leitor 1:N Empréstimo.
- Leitor N:N Livro indiretamente, por meio da entidade associativa Empréstimo.

## Como rodar

Requisitos: Node.js 20 ou superior e npm. Não é necessário instalar um servidor de banco: o SQLite cria o arquivo automaticamente.

```bash
npm install
cp .env.example .env
```

Preencha o `.env`:

```dotenv
DB_DATABASE=biblioteca.sqlite
PORT=3000
```

Inicie a API:

```bash
npm run start:dev
```

A URL base é `http://localhost:3000`. O banco fica no arquivo indicado por `DB_DATABASE`, fora do Git, e os dados permanecem após reiniciar. O `synchronize: true` é usado apenas por ser uma atividade em ambiente de desenvolvimento.

Para compilar e executar a versão de produção:

```bash
npm run build
npm run start:prod
```

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/livros` | Lista livros; filtros opcionais `categoria`, `autor` e `disponivel=true\|false` |
| GET | `/livros/:id` | Detalha livro com autor e categoria |
| POST | `/livros` | Cadastra livro com `titulo`, `exemplares`, `autorId` e `categoriaId` |
| PATCH | `/livros/:id` | Altera um ou mais campos do livro |
| DELETE | `/livros/:id` | Remove livro sem empréstimo aberto |
| GET | `/autores` | Lista autores |
| POST | `/autores` | Cadastra autor com `nome` |
| GET | `/categorias` | Lista categorias |
| POST | `/categorias` | Cadastra categoria com `nome` |
| POST | `/leitores` | Cadastra leitor com `nome`, `matricula` e `email` |
| GET | `/leitores/:id/emprestimos` | Lista empréstimos do leitor; aceita `status=aberto` |
| POST | `/emprestimos` | Empresta com `livroId` e `leitorId` |
| PATCH | `/emprestimos/:id/devolucao` | Devolve e calcula a multa |

Todos os parâmetros `:id` são validados como inteiros. A data prevista é calculada pela API como retirada + 14 dias. A multa é de R$ 1,00 por dia de atraso.

## Respostas

Sucesso:

```json
{
  "sucesso": true,
  "dados": { "id": 7, "titulo": "Dom Casmurro" }
}
```

Erro:

```json
{
  "sucesso": false,
  "erro": {
    "status": 409,
    "codigo": "SEM_EXEMPLAR",
    "mensagem": "Livro 7 sem exemplar disponível"
  },
  "caminho": "/emprestimos",
  "timestamp": "2026-11-03T14:05:00.000Z"
}
```

Exceções inesperadas retornam status 500 e mensagem genérica; seus detalhes ficam apenas no log. O middleware registra método, rota, status e duração de cada requisição.

## Requisições de exemplo

O arquivo [`requests.http`](requests.http) pode ser aberto no VS Code com a extensão REST Client ou importado em clientes compatíveis. Execute a preparação em um banco recém-criado para que os IDs usados nos exemplos coincidam. Ele contém sucesso para todos os endpoints e falhas para R1, R2, R5 e R6, além de outros erros de validação.
