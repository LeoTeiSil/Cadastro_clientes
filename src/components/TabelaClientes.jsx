import React from 'react';

function TabelaClientes({ clientes, onEditar, onExcluir }) {
  return (
    <div className="container">
      <table className="tabela-clientes">
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>Celular</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nomeCompleto}</td>
              <td>{cliente.celular}</td>
              <td>{cliente.endereco}</td>
              <td>
                <div className="botoes">
                  <button className="editar" onClick={() => onEditar(index)}>Editar</button>
                  <button className="excluir" onClick={() => onExcluir(index)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaClientes;
