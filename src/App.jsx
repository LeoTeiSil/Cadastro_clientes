import { useState, useEffect } from 'react';
import './App.css';
import ClienteForm from './components/ClienteForm';
import TabelaClientes from './components/TabelaClientes';
import FiltroCliente from './components/FiltroCliente';

function App() {
  const [clientes, setClientes] = useState(() => {
    const dadosSalvos = localStorage.getItem('clientes');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [filtro, setFiltro] = useState('');
  const [indexEditando, setIndexEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nomeCompleto.toLowerCase().includes(filtro.toLowerCase())
  );

  const adicionarOuEditarCliente = (cliente) => {
    if (indexEditando !== null) {
      const copia = [...clientes];
      copia[indexEditando] = cliente;
      setClientes(copia);
      setIndexEditando(null);
    } else {
      setClientes([...clientes, cliente]);
    }
  };

  const editarCliente = (i) => {
    setIndexEditando(i);
  };

  const excluirCliente = (i) => {
    const novaLista = clientes.filter((_, j) => j !== i);
    setClientes(novaLista);
    if (indexEditando === i) {
      setIndexEditando(null);
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Cadastro de Clientes</h1>

      <ClienteForm
        onSalvar={adicionarOuEditarCliente}
        clienteEditando={indexEditando !== null ? clientes[indexEditando] : null}
      />

      <h2>Clientes Cadastrados</h2>
      <FiltroCliente filtro={filtro} setFiltro={setFiltro} />
      <TabelaClientes
        clientes={clientesFiltrados}
        onEditar={editarCliente}
        onExcluir={excluirCliente}
      />
    </div>
  );
}

export default App;