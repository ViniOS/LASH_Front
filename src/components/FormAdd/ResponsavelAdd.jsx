import { useState, useEffect } from 'react';

function ResponsavelAdd({ id, onSearch }){

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRG] = useState('');
    const [pacienteID, setPacienteID] = useState('');
    const [showTitle, setShowTitle] = useState(true);

    useEffect(() => {
        if(id !== ''){
            onSearch(updateValues);
            setShowTitle(false);
        } else {
            setShowTitle(true);
        }
    }, [])

    const updateValues = (data) => {
        let d = data;
        setNome(d.nome);
        setSobrenome(d.sobrenome);
        setCpf(d.cpf);
        setRG(d.rg);
        setPacienteID(d.pacienteId);
    }

    const handleSubmit = async () => {
        let url = '';
        let method = '';

        if(id === ''){
            url = `http://localhost:3000/responsaveis`;
            method = 'POST';
        } else {
            url = `http://localhost:3000/responsaveis/${id}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nome": nome,
                    "sobrenome": sobrenome,
                    "cpf": cpf,
                    "rg": rg,
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
                <div className="flex flex-wrap -mx-3 mb-6">
                    {showTitle && (
                        <div className='my-8'>
                            <h1 className='text-red-700 font-bold text-center text-2xl'>Adicionar Responsável</h1>
                        </div>   
                    )}
                    {!showTitle && (
                        <div className='my-8'>
                            <h1 className='text-red-700 font-bold text-center text-2xl'>Editar Responsável</h1>
                        </div>   
                    )}                    
                    <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-nome">
                        Nome
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-nome" type="text" placeholder="" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-sobrenome">
                        Sobrenome
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="input-sobrenome" type="text" placeholder="" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}/>
                    </div>
                    <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-cpf">
                        CPF
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-cpf" type="text" placeholder="" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    </div>
                    <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input-rg">
                        RG
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-rg" type="text" placeholder="" value={rg} onChange={(e) => setRG(e.target.value)}/>
                    </div>
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

export default ResponsavelAdd;