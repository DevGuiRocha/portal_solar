import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const NewSimulation = () => {
    const [billValue, setBillValue] = useState('');
    const [simulations, setSimulations] = useState([]);
    const router = useRouter();
    const client = JSON.parse(localStorage.getItem('client'));

    const handleSimulation = async () => {
    try {
        const response = await fetch(`http://localhost:3000/clients/${client.id}/simulations`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bill_value: billValue,  
            }),
          });

        if (response.ok) {
            const data = await response.json();
            alert('Simulação realizada com sucesso!');
            setSimulations(prevSimulations => [...prevSimulations, data.simulation]);
            // Redirecionar ou mostrar resultados
        } else {
            alert('Erro ao realizar simulação.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar simulação.');
    }
  };

  useEffect(() => {
    if (client.id) {
      fetch(`/clients/${client.id}/simulations`)
        .then(response => response.json())
        .then(data => setSimulations(data.simulations))
        .catch(error => console.error('Erro ao carregar simulações:', error));
    }
  }, [client.id]);

  return (
    <div>
      <Navbar />
      <div className="simulation-container">
        <div className="simulation-form">
          <h1>Nova Simulação</h1>
          <input
            type="number"
            placeholder="Valor da Conta de Luz"
            value={billValue}
            onChange={(e) => setBillValue(e.target.value)}
          />
          <button onClick={handleSimulation}>Simular</button>
        </div>
        
        <div className="simulations-list-container">
          <h1>Simulações</h1>
          <ul className="simulations-list">
            {simulations.map((simulation) => (
              <li key={simulation.client_id}>
                <p>Data: {new Date(simulation.created_at).toLocaleString()}</p>
                <a href={`http://localhost:3000/${simulation.pdf}`} target="_blank" rel="noopener noreferrer">
                  Baixar PDF
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewSimulation;
