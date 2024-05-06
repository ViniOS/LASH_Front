import CustomTable from './CustomTable';
import PacienteAdd from './FormAdd/PacienteAdd';
import ResponsavelAdd from './FormAdd/ResponsavelAdd';
import FrequenciaAdd from './FormAdd/FrequenciaAdd';
import DoencaAdd from './FormAdd/DoencaAdd';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search({entity, columns}){

    const [searchValue, setSearchValue] = useState('');
    const [datas, setData] = useState([]);
    const [showTable, setShowTable] = useState(true); 
    const [showForm, setShowForm] = useState(false); 
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');

    //formAdd
    const [formAddString, setformAddString] = useState(entity);

    let formAddRender = null;
    let title = ''; 

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async (callback) => {

        let url = `http://localhost:3000/${entity}`;

        if(searchValue != '') {
            url = `http://localhost:3000/${entity}/${searchValue}`;
        }

        if(selectedItemId != '') {
            url = `http://localhost:3000/${entity}/id/${selectedItemId}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json(); 
            
            setData(data);

            if(callback && showFormEdit){
                callback(data);
            }

            if (searchValue !== '') {
                setShowToast(true); 
                toast.success('Pesquisa realizada com sucesso');
            }

        } catch (err) {
            console.log(err);

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
                    'Content-Type': 'application/json'
                },
            });

            setShowToast(true);
            const responseJson = await response.json();
            toast.success(responseJson.mensagem);

            if(responseJson.ok) {
                const updatedData = datas.filter((item) => item.id !== itemId);
                setData(updatedData);
            }
        } catch (err) {
            setShowToast(true);
            toast.success('Erro ao tentar deletar');
        }
    };
    
    const handleAdd = () => {
        setShowTable(false); 
        setShowForm(true);
    };
    
    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    if(formAddString === 'pacientes') {
        
        formAddRender = <PacienteAdd id={selectedItemId} onSearch={handleSearch} />
        title='Pacientes'
    } 

    if(formAddString === 'responsaveis') {
        formAddRender = <ResponsavelAdd id={selectedItemId} onSearch={handleSearch}/>
        title='Responsáveis'
    } 

    if(formAddString === 'frequencias') {
        formAddRender = <FrequenciaAdd id={selectedItemId}/>
        title='Frequências'
    } 

    if(formAddString === 'doencas') {
        formAddRender = <DoencaAdd id={selectedItemId} onSearch={handleSearch}/>
        title='Doenças'
    } 

    return (
        <div className="flex flex-col justify-around w-4/5">
            {showTable && (
                <div className="w-full">
                    <div className='my-12'>
                        <h1 className='text-red-600 font-bold text-center text-2xl'>Pesquisar {title}</h1>
                    </div>
                    <form className="flex justify-center gap-2">
                        <div className="flex-initial w-7/12">
                            <input type="text" id="searchPacients" value={searchValue} onChange={handleInputChange} className="bg-red-700 border border-gray-300 text-white text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" required />
                        </div>
                        <div>
                            <button type="button" onClick={handleSearch} className="rounded-full border-2 border-red-600 text-red-600 p-1.5 px-4">Pesquisar</button>
                        </div>
                    </form>
                </div>
            )}

            {showTable && (
                <div className="flex justify-center">
                    <CustomTable columns={columns} data={datas} onDelete={handleDelete} onEdit={handleEdit} />
                </div>
            )}

            {showForm && (
                <div className="flex justify-center">
                    {formAddRender}
                </div>
            )}

            {showFormEdit && selectedItemId !== '' && (
                <div className="flex justify-center">
                    {formAddRender}
                </div>
            )} 

            {showToast && (
                <ToastContainer />
            )}

            {showTable && (
                <div className="mx-auto">
                    <button onClick={handleAdd} className="rounded-full border-2 border-red-600 text-red-600 p-1.5 px-4">Adicionar</button>
                </div>
            )}
        </div>
    )
}


export default Search;
