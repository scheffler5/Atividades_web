"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/usuarios", label: "Usuários" },
  { href: "/sobre", label: "Sobre" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <span className="logo">Sistema de Usuários</span>
      <ul>
        {links.map((link) => {
          const ativo =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link href={link.href} className={ativo ? "ativo" : ""}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
