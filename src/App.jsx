import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Paciente from './pages/Paciente';
import Responsavel from './pages/Responsavel';
import Frequencia from './pages/Frequencia';
import Doenca from './pages/Doenca';
import Login from './pages/Login'

function App(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}></Route>
                    <Route path='/pacientes' element={<Paciente/>}></Route>
                    <Route path='/responsaveis' element={<Responsavel/>}></Route>
                    <Route path='/frequencia' element={<Frequencia/>}></Route>
                    <Route path='/doencas' element={<Doenca/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;