import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Bem-vindo!</h1>
      <p>
        Este é um pequeno sistema de usuários feito com Next.js, usando
        <code> useState</code>, <code>useEffect</code> e roteamento.
      </p>
      <Link href="/usuarios" className="botao">
        Ver usuários
      </Link>
    </section>
  );
}
