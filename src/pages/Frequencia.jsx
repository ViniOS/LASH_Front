import SideBar from "../components/SideBar";
import Search from "../components/Search";

function Frequencia(){
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'pacienteId', label: 'ID do paciente' },
        { key: 'createdAt', label: 'data' },
        { key: 'excluir', label: ''},
    ];

    return (
        <div>
            <div className="flex">
                <SideBar/>
                <Search entity="frequencias" columns={columns}/>
            </div>  
        </div>
    )
}

export default Frequencia;