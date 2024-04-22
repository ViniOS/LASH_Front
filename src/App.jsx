import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Paciente from './pages/Paciente';
import Responsavel from './pages/Responsavel';


function App(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/pacientes' element={<Paciente/>}></Route>
                    <Route path='/responsaveis' element={<Responsavel/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;