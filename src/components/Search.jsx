import React, { useState, useEffect } from 'react';
import CustomTable from './CustomTable';
import PacienteAdd from './FormAdd/PacienteAdd';
import ResponsavelAdd from './FormAdd/ResponsavelAdd';
import FrequenciaAdd from './FormAdd/FrequenciaAdd';
import DoencaAdd from './FormAdd/DoencaAdd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search({ entity, columns }) {
  const [searchValue, setSearchValue] = useState('');
  const [datas, setDatas] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  useEffect(() => {
    handleSearch();
  }, []);

  // Função para obter o token JWT armazenado no localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const handleSearch = async () => {
    let url = `http://localhost:3000/${entity}`;

    if (searchValue !== '') {
      url = `http://localhost:3000/${entity}/${searchValue}`;
    }

    if (selectedItemId !== '') {
      url = `http://localhost:3000/${entity}/id/${selectedItemId}`;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Inclui o token JWT no cabeçalho Authorization
        },
      });
      const data = await response.json();
      setDatas(data);

      if (searchValue !== '') {
        setShowToast(true);
        toast.success('Pesquisa realizada com sucesso');
      }
    } catch (err) {
      console.error(err);
      setShowToast(true);
      toast.error('Erro ao pesquisar');
    }
  };

  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    setShowFormEdit(true);
    setShowTable(false);
  };

  const handleDelete = async (itemId) => {
    let url = `http://localhost:3000/${entity}/${itemId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`, // Inclui o token JWT no cabeçalho Authorization
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      toast.success(responseData.mensagem);

      if (responseData.ok) {
        const updatedData = datas.filter((item) => item.id !== itemId);
        setDatas(updatedData);
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro ao tentar deletar');
    }
  };

  const handleAdd = () => {
    setShowTable(false);
    setShowForm(true);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  let formAddRender = null;
  let title = '';

  switch (entity) {
    case 'pacientes':
      formAddRender = <PacienteAdd id={selectedItemId} onSearch={handleSearch} />;
      title = 'Pacientes';
      break;
    case 'responsaveis':
      formAddRender = <ResponsavelAdd id={selectedItemId} onSearch={handleSearch} />;
      title = 'Responsáveis';
      break;
    case 'frequencias':
      formAddRender = <FrequenciaAdd id={selectedItemId} />;
      title = 'Frequências';
      break;
    case 'doencas':
      formAddRender = <DoencaAdd id={selectedItemId} onSearch={handleSearch} />;
      title = 'Doenças';
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col justify-around w-4/5">
      {showTable && (
        <div className="w-full">
          <div className="my-12">
            <h1 className="text-red-700 font-bold text-center text-2xl">Pesquisar {title}</h1>
          </div>
          <form className="flex justify-center gap-2">
            <div className="flex-initial w-7/12">
              <input
                type="text"
                id="searchPacients"
                value={searchValue}
                onChange={handleInputChange}
                className="bg-red-700 border border-gray-300 text-white text-sm rounded-full focus:ring-red-700 focus:border-red-700 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div>
              <button type="button" onClick={handleSearch} className="rounded-full border-2 border-red-700 text-red-700 p-1.5 px-4">
                Pesquisar
              </button>
            </div>
          </form>
        </div>
      )}

      {showTable && (
        <div className="flex justify-center">
          <CustomTable columns={columns} data={datas} onDelete={handleDelete} onEdit={handleEdit} entity={entity} />
        </div>
      )}

      {showForm && (
        <div className="flex justify-center">{formAddRender}</div>
      )}

      {showFormEdit && selectedItemId !== '' && (
        <div className="flex justify-center">{formAddRender}</div>
      )}

      {showToast && <ToastContainer />}

      {showTable && (
        <div className="mx-auto">
          <button onClick={handleAdd} className="rounded-full border-2 border-red-600 text-red-600 p-1.5 px-4">
            Adicionar Novo
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
