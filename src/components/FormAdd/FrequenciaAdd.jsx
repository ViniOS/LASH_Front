import { useState } from 'react';

function FrequenciaAdd({ id }){

    const [pacienteID, setPacienteID] = useState('');

    const handleSubmit = async () => {
        
        let url = '';
        let method = '';

        if(id === ''){
            url = `http://localhost:3000/frequencias`;
            method = 'POST';
        } else {
            url = `http://localhost:3000/frequencias/${id}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "pacienteId": pacienteID
                })
            })

        } catch (err) {
            console.log(err);
        }
        
    }
      
    return (
        <div>
            <form className="w-full max-w-lg">
                <div className='my-8'>
                    <h1 className='text-red-700 font-bold text-center text-2xl'>Adicionar Frequência</h1>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-pacienteID">
                        ID do paciente
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-pacienteID" type="text" placeholder="" value={pacienteID} onChange={(e) => setPacienteID(e.target.value)}/>
                    </div>
                </div>
                <div className="mx-auto">
                    <button onClick={handleSubmit} className="rounded-full border-2 border-red-700 text-red-800 p-1.5 px-4">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default FrequenciaAdd;