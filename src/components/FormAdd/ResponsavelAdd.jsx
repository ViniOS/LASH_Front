import { useState, useEffect } from "react";
import InputMask from "react-input-mask";

function ResponsavelAdd({ id, onSearch }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRG] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [pacienteNome, setPacienteNome] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [showTitle, setShowTitle] = useState(true);

  const token = localStorage.getItem('token');

  const ufs = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  useEffect(() => {
    // if (id !== "") {
    //   onSearch(updateValues);
    //   setShowTitle(false);
    // } else {
    //   setShowTitle(true);
    // }

    fetch(`http://localhost:3000/responsaveis/id/${id}`, {
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => updateValues(data))
      .catch(error => console.error('Erro ao buscar responsaveis:', error));



    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try { // Recupere o token de onde estiver armazenado
  
      const response = await fetch("http://localhost:3000/pacientes", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Inclua o token no cabeçalho da requisição
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar pacientes');
      }
  
      const data = await response.json();
      setPacientes(data.map(paciente => ({
        ...paciente,
        nomeCompleto: `${paciente.nome} ${paciente.sobrenome}`
      })));
    } catch (err) {
      console.error("Erro ao buscar pacientes", err);
    }
  };
  

  const updateValues = (data) => {
    setNome(data.nome);
    setSobrenome(data.sobrenome);
    setCpf(data.cpf);
    setRG(data.rg);
    setCidade(data.cidade);
    setBairro(data.bairro);
    setEndereco(data.endereco);
    setNumero(data.numero);
    setUf(data.uf);
    setCep(data.cep);
    setPacienteNome(data.paciente ? `${data.paciente.nome} ${data.paciente.sobrenome}` : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPaciente = pacientes.find(p => p.nomeCompleto === pacienteNome);

    let url = id === "" ? "http://localhost:3000/responsaveis" : `http://localhost:3000/responsaveis/${id}`;
    let method = id === "" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome, sobrenome, cpf, rg, pacienteId: selectedPaciente ? selectedPaciente.id : null,
          cidade, uf, bairro, endereco, numero, cep
        }),
      });
      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Autocompletar com ViaCep
  const checkCEP = async (event) => {
    const cepValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setCep(cepValue);
  
    if (cepValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        if (response.ok) {
          const data = await response.json();
          if (data && !data.erro) {
            setEndereco(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setUf(data.uf);
          } else {
            setEndereco("");
            setBairro("");
            setCidade("");
            setUf("");
            alert('CEP não encontrado');
          }
        } else {
          alert('Erro ao buscar o CEP');
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto">
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="my-8 w-full">
            <h1 className="text-red-700 font-bold text-center text-2xl">
              {showTitle ? "Adicionar Responsável" : "Editar Responsável"}
            </h1>
          </div>
          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-nome">
              Nome
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="input-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-sobrenome">
              Sobrenome
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="input-sobrenome"
              type="text"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-cpf">
              CPF
            </label>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="input-cpf"
              type="text"
            />
          </div>
          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-rg">
              RG
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="input-rg"
              type="text"
              value={rg}
              onChange={(e) => setRG(e.target.value)}
            />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-pacienteNome">
              Nome do Paciente
            </label>
            <select
              id="input-pacienteNome"
              value={pacienteNome}
              onChange={(e) => setPacienteNome(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled>Selecione o paciente</option>
              {pacientes.map(paciente => (
                <option key={paciente.id} value={paciente.nomeCompleto}>
                  {paciente.nomeCompleto}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-endereco">
              Endereço
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="input-endereco"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-5 px-3 mb-2">
            <div className="w-1/3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-numero">
                Número
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="input-numero"
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-cep">
                CEP
              </label>
              <InputMask
                mask="99999-999"
                value={cep}
                onChange={checkCEP}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="input-cep"
                type="text"
              />
            </div>
            <div className="w-1/3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-uf">
                UF
              </label>
              <select
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="input-uf"
              >
                <option value="" disabled>
                  Selecione a UF
                </option>
                {ufs.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex gap-5 px-3">
            <div className="w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-cidade">
                Cidade
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="input-cidade"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-bairro">
                Bairro
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="input-bairro"
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResponsavelAdd;