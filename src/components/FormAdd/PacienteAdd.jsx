import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import validator from "validator";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

function PacienteAdd({ id, onSearch }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [doenca, setDoenca] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [errors, setErrors] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    dataNascimento: "",
  });

  const [doencas, setDoencas] = useState([]);

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

  const resetFields = () => {
    setNome("");
    setSobrenome("");
    setCpf("");
    setCidade("");
    setCep("");
    setUf("");
    setBairro("");
    setEndereco("");
    setNumero("");
    setDoenca("");
    setDataNascimento("");
  };

  useEffect(() => {
    
    
    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/pacientes/id/${id}`, {
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => updateValues(data))
      .catch(error => console.error('Erro ao buscar pacientes:', error));




    // Fetch das doenças
    fetch('http://localhost:3000/doencas', {
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Mapeia os dados recebidos e seta no estado doencas
        if (Array.isArray(data)) {
          setDoencas(data); // Define os dados das doenças no estado
          if (data.length > 0) {
            setDoenca(data[0].nome); // Define a primeira doença como padrão
          }
        } else {
          console.error('Os dados recebidos não são um array:', data);
        }
      })
      .catch(error => console.error('Erro ao buscar doenças:', error));
  }, []);

  const updateValues = (data) => {
    console.log(data);
    setNome(data.nome);
    setSobrenome(data.sobrenome);
    setCpf(data.cpf);
    setCidade(data.cidade);
    setBairro(data.bairro);
    setEndereco(data.endereco);
    setNumero(data.numero);
    setUf(data.uf);
    setCep(data.cep);
    setDoenca(data.doenca);
    setDataNascimento(data.dataNascimento);
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

    const onlyNumbers = (str) => str.replace(/\D/g, "");
    const cpfNumeros = onlyNumbers(cpf);

    if (nome.length < 2) {
      formErrors.nome = "O nome deve ter pelo menos 2 caracteres.";
      hasErrors = true;
    }

    if (!/^[a-zA-Z\s-]+$/.test(sobrenome) || /\d/.test(sobrenome)) {
      formErrors.sobrenome = "O sobrenome deve conter apenas letras e espaços.";
      hasErrors = true;
    }

    if (!validator.isNumeric(cpfNumeros) || cpfNumeros.length !== 11) {
      formErrors.cpf = "CPF inválido. Digite apenas números.";
      hasErrors = true;
    }

    const validateDateSimple = (value) => {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(value)) {
        return "Formato de data inválido (DD/MM/AAAA)";
      }
      return true;
    };

    const dataValida = validateDateSimple(dataNascimento);
    if (dataValida !== true) {
      formErrors.dataNascimento = dataValida;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(formErrors);
      return;
    }

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
      const token = localStorage.getItem('token');

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
          uf: uf,
        }),
      });

      if (response.ok) {
        resetFields();
        toast.success("Dados enviados com sucesso!");
        console.log("Dados enviados com sucesso!");
      } else {
        const errorData = await response.json();
        console.log("Erro ao enviar os dados:", errorData);
        setErrors({
          geral: "Erro ao enviar os dados. Por favor, tente novamente.",
        });
      }
    } catch (err) {
      console.log("Erro na requisição:", err);
      setErrors({ geral: "Erro na requisição. Por favor, tente novamente." });
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
            toast.error('CEP não encontrado!')
          }
        } else {
          toast.error('Erro ao buscar CEP!')
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };  

  return (
    <div>
      <ToastContainer />
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && <p className="text-red-500">{errors.nome}</p>}
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
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
            {errors.sobrenome && (
              <p className="text-red-500">{errors.sobrenome}</p>
            )}
          </div>
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
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-dataNascimento"
              >
                Data de Nascimento
              </label>
              <InputMask
                mask="99/99/9999"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="input-dataNascimento"
                type="text"
              />
              {errors.dataNascimento && (
                <p className="text-red-500 text-xs italic">
                  {errors.dataNascimento}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-doenca"
              >
                Doença
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="input-doenca"
                value={doenca}
                onChange={(e) => setDoenca(e.target.value)} // Alterado para setar uma string simples
              >
                <option value="">Selecione uma doença</option>
                {doencas.map((doencaOption, index) => (
                  <option key={index} value={doencaOption.nome}>
                    {doencaOption.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="input-endereco"
            >
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
          <div className="w-full flex gap-5">
            <div className="w-1/3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-numero"
              >
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
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-cep"
              >
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
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-uf"
              >
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
          <div className="w-full flex gap-5 mt-4">
            <div className="w-1/2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-cidade"
              >
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
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="input-bairro"
              >
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
          <div className="w-full flex justify-center mt-6">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={handleSubmit}
            >
              {id === "" ? "Adicionar Paciente" : "Atualizar Paciente"}
            </button>
          </div>
        </div>
      </form>
      {errors.geral && (
        <p className="text-red-600 text-center mt-4">{errors.geral}</p>
      )}
    </div>
  );
}

export default PacienteAdd;
