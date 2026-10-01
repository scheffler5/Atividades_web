"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usuariosMock } from "@/data/usuarios";

export default function DetalhesUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log(`Buscando usuário com ID ${id}`);
    setCarregando(true);

    const timer = setTimeout(() => {
      const encontrado = usuariosMock.find((u) => u.id === Number(id));
      setUsuario(encontrado || null);
      setCarregando(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      console.log(`Saindo dos detalhes do usuário ${id}`);
    };
  }, [id]);

  const idAtual = Number(id);
  const anterior = usuariosMock.find((u) => u.id === idAtual - 1);
  const proximo = usuariosMock.find((u) => u.id === idAtual + 1);

  return (
    <section>
      <h1>Detalhes do Usuário</h1>

      {carregando ? (
        <p>Carregando...</p>
      ) : usuario ? (
        <div className="card">
          <p>
            <strong>ID:</strong> {usuario.id}
          </p>
          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
        </div>
      ) : (
        <p>Usuário não encontrado.</p>
      )}

      <div className="acoes">
        {anterior && <Link href={`/usuarios/${anterior.id}`}>← Anterior</Link>}
        <Link href="/usuarios">Voltar para a lista</Link>
        {proximo && <Link href={`/usuarios/${proximo.id}`}>Próximo →</Link>}
      </div>
    </section>
  );
}
