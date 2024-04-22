import SideBar from "../components/SideBar";
import Search from "../components/Search";

function Responsavel(){
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'nome', label: 'Nome' },
        { key: 'sobrenome', label: 'Sobrenome' },
        { key: 'cpf', label: 'CPF' },
        { key: 'pacienteId', label: 'Id do paciente'},
        { key: 'editar', label: ''},
        { key: 'excluir', label: ''},
    ];

    return (
        <div>
            <div className="flex">
                <SideBar/>
                <Search entity="responsaveis" columns={columns}/>
            </div>  
        </div>
    )
}

export default Responsavel;