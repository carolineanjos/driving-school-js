import { StudentsList } from './pages/Students';
import { Classes } from './pages/Classes';
import { GeneralStatus } from './pages/GeneralStatus';
import { IndividualStatusTable } from './pages/IndividualStatusTable';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import logo from './assets/car-icon.png';
import './App.css';

const students = [
  { id: 1, name: "Eduardo Silva", type: "A" },
  { id: 2, name: "João Oliveira", type: "B" },
  { id: 3, name: "João Santos", type: "A" },
  { id: 4, name: "Eduardo Oliveira", type: "B" },
  { id: 5, name: "Carlos Pereira", type: "B" },
  { id: 6, name: "João Ferreira", type: "B" },
  { id: 7, name: "Larissa Lima", type: "A" },
  { id: 8, name: "Ana Oliveira", type: "A" },
  { id: 9, name: "Isabela Santos", type: "A" },
  { id: 10, name: "Larissa Costa", type: "A" }
];

function App() {

  const studentRegister = () => {

  };

  const goToIndividualStatusPage = () => {
    return <Link to='/individual-status' />;
  };

  return (
    <Router>
      <div className='header-container'>
        <div className='logo-container'>
          <img src={logo} />
          <h1>Autoescola</h1>
        </div>
        <div className='tabs-container'>
          <Link to='/students' className='tabs-content'>Alunos</Link>
          <Link to='/classes' className='tabs-content'>Aulas</Link>
          <Link to='/general-status' className='tabs-content'>Status Geral</Link>
        </div>
      </div>

      <Routes>
        <Route path='/students' element={<StudentsList students={students} />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/general-status' element={<GeneralStatus />} />
        <Route path='/students/:id' element={<IndividualStatusTable />} />
      </Routes>
    </Router>
  );
}

export default App;
