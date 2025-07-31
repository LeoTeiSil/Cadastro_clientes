import React from 'react';

function FiltroCliente({ filtro, setFiltro }) {
  return (
    <input
      type="text"
      placeholder="Filtrar por nome..."
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
    />
  );
}

export default FiltroCliente;