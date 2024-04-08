import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Paciente from './pages/Paciente';


function App(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/pacientes' element={<Paciente/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;