import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Sistema de Usuários",
  description: "Atividade prática com Next.js: useState, useEffect e roteamento",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
