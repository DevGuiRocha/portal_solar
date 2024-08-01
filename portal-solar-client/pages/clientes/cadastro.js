import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: {
            name,
            email,
            password,
          },
        }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        router.push('/');
      } else {
        alert('Erro ao realizar o cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cadastro-container">
        <div className="cadastro-box">
          <h1>Cadastro de Usuário</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </label>
            <label>
              Email:
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </label>
            <label>
              Senha:
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </label>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cadastro;
