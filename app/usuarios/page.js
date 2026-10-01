"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usuariosMock } from "@/data/usuarios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log("Página /usuarios montada");

    const timer = setTimeout(() => {
      setUsuarios(usuariosMock);
      setCarregando(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      console.log("Saindo da página /usuarios");
    };
  }, []);

  return (
    <section>
      <h1>Lista de Usuários</h1>

      {carregando ? (
        <p>Carregando usuários...</p>
      ) : (
        <ul className="lista">
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              <Link href={`/usuarios/${usuario.id}`}>
                <strong>{usuario.nome}</strong>
                <span>{usuario.email}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
