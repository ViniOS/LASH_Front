import { useState, useEffect } from 'react';
import Search from '../Search';

function DoencaAdd({ id, onSearch }){
    
    const [doenca, setDoenca] = useState('');
    const [showTitle, setShowTitle] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(id !== ''){
            onSearch(updateValues);
            setShowTitle(false);
        } else {
            setShowTitle(true);
        }



        fetch(`http://localhost:3000/doencas/id/${id}`, {
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => updateValues(data))
            .catch(error => console.error('Erro ao buscar pacientes:', error));
    }, [])

    const updateValues = (data) => {
        setDoenca(data.nome);
    }

    const handleSubmit = async (doenca) => {

        let url = '';
        let method = '';

        if(id === ''){
            url = `http://localhost:3000/doencas`;
            method = 'POST';
        } else {
            url = `http://localhost:3000/doencas/${id}`;
            method = 'PUT';
        }

        try {

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "nome": doenca
                })
            })

            const newData = await response.json(); 
            setData([...datas, newData]);

        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <div>
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    {showTitle && (
                        <div className='my-8'>
                            <h1 className='text-red-700 font-bold text-center text-2xl'>Adicionar Doença</h1>
                        </div>   
                    )}
                    {!showTitle && (
                        <div className='my-8'>
                            <h1 className='text-red-700 font-bold text-center text-2xl'>Editar Doença</h1>
                        </div>   
                    )}                      
                    <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-nome">
                        Nome
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-nome" type="text" placeholder="" value={doenca} onChange={(e) => setDoenca(e.target.value)}/>
                    </div>
                </div>
                <div className="mx-auto">
                    <button onClick={() => handleSubmit(doenca)} className="rounded-full border-2 border-red-700 text-red-700 p-1.5 px-4">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default DoencaAdd;