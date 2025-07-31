import { useState, useEffect } from 'react';
import { IMaskInput } from 'react-imask';

function ClienteForm({ onSalvar, clienteEditando }) {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    celular: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: ''
  });

  useEffect(() => {
    if (clienteEditando) {
      const [nome, ...sob] = clienteEditando.nomeCompleto.split(' ');
      setForm({
        nome,
        sobrenome: sob.join(' '),
        celular: clienteEditando.celular,
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: ''
      });
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const buscarEndereco = async () => {
      const cepLimpo = form.cep.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
          const dados = await res.json();
          if (!dados.erro) {
            setForm(prev => ({
              ...prev,
              logradouro: dados.logradouro || '',
              bairro: dados.bairro || '',
              cidade: dados.localidade || '',
              uf: dados.uf || ''
            }));
          }
        } catch (err) {
          console.error("Erro CEP:", err);
        }
      }
    };
    buscarEndereco();
  }, [form.cep]);

  const limparFormulario = () => {
    setForm({
      nome: '',
      sobrenome: '',
      celular: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novo = {
      nomeCompleto: `${form.nome} ${form.sobrenome}`,
      celular: form.celular,
      endereco: `${form.logradouro}, ${form.numero} - ${form.bairro}, ${form.cidade} - ${form.uf}`
    };
    onSalvar(novo);
    limparFormulario();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
      <input id="sobrenome" value={form.sobrenome} onChange={handleChange} placeholder="Sobrenome" required />

      <IMaskInput
        mask="+55 (00) 00000-0000"
        id="celular"
        placeholder="Celular"
        value={form.celular}
        onAccept={(val) => setForm(prev => ({ ...prev, celular: val }))}
        required
      />

      <input id="cep" value={form.cep} onChange={handleChange} placeholder="CEP" required />
      <input id="logradouro" value={form.logradouro} placeholder="Rua" readOnly />
      <input id="numero" value={form.numero} onChange={handleChange} placeholder="Número" required />
      <input id="bairro" value={form.bairro} placeholder="Bairro" readOnly />
      <input id="cidade" value={form.cidade} placeholder="Cidade" readOnly />
      <input id="uf" value={form.uf} placeholder="UF" readOnly />

      <div className="buttons">
        <button type="submit">
          {clienteEditando ? 'Atualizar' : 'Salvar'}
        </button>
        <button type="button" onClick={limparFormulario}>Limpar Formulário</button>
      </div>
    </form>
  );
}

export default ClienteForm;