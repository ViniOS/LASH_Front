import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import validator from "validator";
import "react-datepicker/dist/react-datepicker.css"; // Importando CSS do DatePicker

function PacienteAdd({ id, onSearch }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
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
  const [dataNascimento, setDataNascimento] = useState(null); // Data inicial como null
  const [showTitle, setShowTitle] = useState(false);
  const [errors, setErrors] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    dataNascimento: "",
  });

  useEffect(() => {
    if (id !== "") {
      onSearch(updateValues);
      setShowTitle(false);
    } else {
      setShowTitle(true);
    }
  }, []);

  const updateValues = (data) => {
    console.log(data);

    let d = data;
    setNome(d.nome);
    setSobrenome(d.sobrenome);
    setCpf(d.cpf);
    setCidade(d.cidade);
    setBairro(d.bairro);
    setEndereco(d.endereco);
    setNumero(d.numero);
    setUf(d.uf);
    setCep(d.cep);
    setDoenca(d.doenca);
    setDataNascimento(d.dataNascimento);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {
      nome: "",
      sobrenome: "",
      cpf: "",
      dataNascimento: "",
    };
    let hasErrors = false;

    // Função para remover caracteres não numéricos
    const onlyNumbers = (str) => str.replace(/\D/g, "");
    const cpfNumeros = onlyNumbers(cpf);

    // Validação do nome
    if (nome.length < 2) {
      formErrors.nome = "O nome deve ter pelo menos 2 caracteres.";
      hasErrors = true;
    }

    //Validação do sobrenome
    if (!/^[a-zA-Z\s-]+$/.test(sobrenome) || /\d/.test(sobrenome)) {
      formErrors.sobrenome = "O sobrenome deve conter apenas letras e espaços.";
      hasErrors = true;
    }

    // Validação do CPF
    if (!validator.isNumeric(cpfNumeros) || cpfNumeros.length !== 11) {
      formErrors.cpf = "CPF inválido. Digite apenas números.";
      hasErrors = true;
    }

    const validateDateSimple = (value) => {
      // Expressão regular para data no formato DD/MM/YYYY
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;

      // Validação
      if (!regex.test(value)) {
        return "Formato de data inválido (DD/MM/AAAA)";
      }

      // Data válida
      return true;
    };

    // Validação data
    const dataValida = validateDateSimple(dataNascimento);
    if (dataValida !== true) {
      formErrors.dataNascimento = dataValida;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(formErrors);
      return;
    }

    // Aqui continua o código para envio do formulário se não houver erros
    let url = "";
    let method = "";

    if (id === "") {
      url = `http://localhost:3000/pacientes`;
      method = "POST";
    } else {
      url = `http://localhost:3000/pacientes/${id}`;
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
          cidade: cidade,
          bairro: bairro,
          numero: numero,
          endereco: endereco,
          doenca: doenca,
          dataNascimento: dataNascimento,
          cep: cep,
          uf: uf
        }),
      });

      if (response.ok) {
        console.log("Dados enviados com sucesso!");
      } else {
        console.log("Erro ao enviar os dados:", response.statusText);
        setErrors({
          geral: "Erro ao enviar os dados. Por favor, tente novamente.",
        });
      }
    } catch (err) {
      console.log("Erro na requisição:", err);
      setErrors({ geral: "Erro na requisição. Por favor, tente novamente." });
    }
  };

  return (
    <div>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          {showTitle && (
            <div className="my-8">
              <h1 className="text-red-700 font-bold text-center text-2xl">
                Adicionar Paciente
              </h1>
            </div>
          )}
          {!showTitle && (
            <div className="my-8">
              <h1 className="text-red-700 font-bold text-center text-2xl">
                Editar Paciente
              </h1>
            </div>
          )}
          {/* Campo de nome */}
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
            {errors.nome && <p className="text-red-500">{errors.nome}</p>}
          </div>
          {/* Campo de sobrenome */}
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
            {errors.sobrenome && (
              <p className="text-red-500">{errors.sobrenome}</p>
            )}
          </div>
          {/* Campo de CPF */}
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-cpf"
            >
              CPF
            </label>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="input-cpf"
              type="text"
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs italic">{errors.cpf}</p>
            )}
          </div>
          {/* Campo Cidade */}
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
  <option value=""></option>
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
              htmlFor="input-doenca"
            >
              Doença
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="input-doenca"
              type="text"
              placeholder=""
              value={doenca}
              onChange={(e) => setDoenca(e.target.value)}
            />
          </div>
          {/* Campo de data de nascimento */}
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-data"
            >
              Data de nascimento
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="input-data"
              type="text"
              placeholder="DD/MM/AAAA"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            {errors.dataNascimento && (
              <p className="text-red-500">{errors.dataNascimento}</p>
            )}
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

export default PacienteAdd;
