import { Link } from 'react-router-dom';

function SideBar(){
    return (
        <div className="flex-initial w-1/5"> 
            <nav className="bg-white text-lg font-semibold text-slate-100">
                <div className="flex flex-col justify-between content-evenly h-screen bg-red-800">
                    <div className="w-2/4 p-2 m-2">
                        <h2 className="text-2xl font-bold text-slate-100">LASH</h2>
                    </div>
                    <div className="flex flex-col gap-5 mx-auto">
                        <Link to={'/pacientes'} className="cursor-pointer hover:opacity-80">Pacientes</Link>
                        <Link to={'/responsaveis'} className="cursor-pointer hover:opacity-80">Responsáveis</Link>
                        <Link to={'/frequencia'} className="cursor-pointer hover:opacity-80">Frequência</Link>
                        <Link to={'/doencas'} className="cursor-pointer hover:opacity-80">Doenças</Link>
                    </div>
                    <div className="flex border-2 rounded-full w-2/4 p-2 m-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <div>
                            <h3>ADMIN</h3>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SideBar;