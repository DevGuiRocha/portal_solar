import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    const client = JSON.parse(localStorage.getItem('client'));
    if (client) {
      setLoggedIn(true);
      setClientName(client.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('client');
    setLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/">Home</Link>
        <Link href="/clientes/cadastro">Cadastro</Link>
      </div>
      <div className="nav-right">
        {loggedIn ? (
          <>
            <Link href="/simulations/new">Simulações</Link>
            <Link href={`/clientes/${JSON.parse(localStorage.getItem('client')).id}`}>{clientName}</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
