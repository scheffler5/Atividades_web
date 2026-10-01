# Sistema de Usuários — Next.js

Atividade prática: aplicação em Next.js usando `useState`, `useEffect` e roteamento.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Home |
| `/usuarios` | Lista de usuários (dados mockados) |
| `/usuarios/[id]` | Detalhes do usuário |
| `/sobre` | Página simples |

## Onde estão os requisitos

- **Navbar** com `Link` (navegação sem reload): `components/Navbar.js`
- **Dados mockados**: `data/usuarios.js`
- **useState + useEffect para carregar dados**: `app/usuarios/page.js`
- **useEffect que reage ao ID** da URL (`useParams`): `app/usuarios/[id]/page.js`
- **Cleanup** (`console.log` ao sair da página): nas duas páginas acima

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. Abra o console do navegador para ver os logs do `useEffect` e do cleanup.
