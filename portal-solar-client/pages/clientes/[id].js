import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ClientProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/clients/${id}`)
        .then(response => response.json())
        .then(data => setClient(data))
        .catch(error => console.error('Error:', error));
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/clients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client }),
      });

      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
        router.push('/');
      } else {
        console.error('Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm('Tem certeza que deseja deletar sua conta?');
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:3000/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        try {
          await fetch('http://localhost:3000/logout', {
            method: 'DELETE',
            credentials: 'include',
          });
        } catch (logoutError) {
          console.log('Erro ao fazer logout, sessão pode já estar encerrada:', logoutError);
        }
  
        alert('Sua conta foi deletada com sucesso.');
        router.push('/');
      } else {
        alert('Ocorreu um erro ao tentar deletar sua conta.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao tentar deletar sua conta.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="perfil-container">
        <div className="perfil-box">
          <h2>Perfil do Cliente</h2>
          <form>
            <label>
              Nome:
              <input
                type="text"
                value={client.name}
                onChange={e => setClient({ ...client, name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input type="text" value={client.email} disabled />
            </label>
            <label>
              Senha:
              <input
                type="password"
                value={client.password}
                onChange={e => setClient({ ...client, password: e.target.value })}
              />
            </label>
            <button type="button" className="btn-update" onClick={handleUpdate}>
              Atualizar Perfil
            </button>
            <button type="button" className="btn-delete" onClick={handleDeleteAccount}>
              Deletar Conta
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientProfile;
