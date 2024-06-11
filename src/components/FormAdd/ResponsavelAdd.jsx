import { useState, useEffect } from "react";

function ResponsavelAdd({ id, onSearch }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRG] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  const [uf, setUf] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [doenca, setDoenca] = useState("");
  const [pacienteID, setPacienteID] = useState("");
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    if (id !== "") {
      onSearch(updateValues);
      setShowTitle(false);
    } else {
      setShowTitle(true);
    }
  }, []);

  const updateValues = (data) => {
    let d = data;
    setNome(d.nome);
    setSobrenome(d.sobrenome);
    setCpf(d.cpf);
    setRG(d.rg);
    setCidade(d.cidade);
    setBairro(d.bairro);
    setEndereco(d.endereco);
    setNumero(d.numero);
    setUf(d.uf);
    setCep(d.cep);
    setPacienteID(d.pacienteId);
  };

  const handleSubmit = async () => {
    let url = "";
    let method = "";

    if (id === "") {
      url = `http://localhost:3000/responsaveis`;
      method = "POST";
    } else {
      url = `http://localhost:3000/responsaveis/${id}`;
      method = "PUT";
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          sobrenome: sobrenome,
          cpf: cpf,
          rg: rg,
          pacienteId: pacienteID,
          cidade: cidade,
          uf: uf,
          bairro: bairro,
          endereco: endereco,
          numero: numero,
          cep: cep
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          {showTitle && (
            <div className="my-8">
              <h1 className="text-red-700 font-bold text-center text-2xl">
                Adicionar Responsável
              </h1>
            </div>
          )}
          {!showTitle && (
            <div className="my-8">
              <h1 className="text-red-700 font-bold text-center text-2xl">
                Editar Responsável
              </h1>
            </div>
          )}
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-nome"
            >
              Nome
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="input-nome"
              type="text"
              placeholder=""
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-sobrenome"
            >
              Sobrenome
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="input-sobrenome"
              type="text"
              placeholder=""
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-cpf"
            >
              CPF
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="input-cpf"
              type="text"
              placeholder=""
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-5">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-cidade"
              >
                Cidade
              </label>

              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="input-cidade"
                type="text"
                placeholder=""
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="w-1/4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-uf"
              >
                UF
              </label>

              <select
                className="w-full bg-gray-200 text-gray-700 rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="input-uf"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              >
                {ufs.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-bairro"
              >
                Bairro
              </label>

              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="input-bairro"
                type="text"
                placeholder=""
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
            <div className="w-1/4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-cep"
              >
                CEP
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="input-cep"
                type="text"
                placeholder=""
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-endereco"
              >
                Endereço
              </label>

              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="input-endereco"
                type="text"
                placeholder=""
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div className="w-1/4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-numero"
              >
                Número
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="input-numero"
                type="text"
                placeholder=""
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-rg"
            >
              RG
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="input-rg"
              type="text"
              placeholder=""
              value={rg}
              onChange={(e) => setRG(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-pacienteID"
            >
              ID do paciente
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="input-pacienteID"
              type="text"
              placeholder=""
              value={pacienteID}
              onChange={(e) => setPacienteID(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-auto">
          <button
            onClick={handleSubmit}
            className="rounded-full border-2 border-red-700 text-red-800 p-1.5 px-4"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResponsavelAdd;
