import SideBar from "../components/SideBar";
import Search from "../components/Search";

function Doenca(){
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'nome', label: 'Nome' },
        { key: 'editar', label: ''},
        { key: 'excluir', label: ''},
    ];

    return (
        <div>
            <div className="flex">
                <SideBar/>
                <Search entity="doencas" columns={columns}/>
            </div>  
        </div>
    )
}

export default Doenca;