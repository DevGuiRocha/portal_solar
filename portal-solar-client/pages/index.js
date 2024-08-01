// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Página Inicial</title>
        <meta name="description" content="Página inicial do Portal Solar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <h1>Bem-vindo ao Portal Solar</h1>
        <p>Simule seu gerador de energia solar aqui!</p>
        {/* <Link href="/clientes">Ver Clientes</Link> */}
      </main>

      <footer>
        <p>© 2024 Portal Solar</p>
      </footer>
    </div>
  );
}
