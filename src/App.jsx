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

const classes = [
  { id: 1, name: "Aula 1", status: "Concluído" },
  { id: 2, name: "Aula 2", status: "Não iniciada" },
  { id: 3, name: "Aula 3", status: "Concluído" },
  { id: 4, name: "Aula 4", status: "Em andamento" },
  { id: 5, name: "Aula 5", status: "Em andamento" },
  { id: 6, name: "Aula 6", status: "Não iniciada" },
  { id: 7, name: "Aula 7", status: "Não iniciada" },
  { id: 8, name: "Aula 8", status: "Não iniciada" },
  { id: 9, name: "Aula 9", status: "Em andamento" },
  { id: 10, name: "Aula 10", status: "Concluído" },
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
        <Route path='/classes' element={<Classes classes={classes} />} />
        <Route path='/general-status' element={<GeneralStatus />} />
        <Route path={`/students/:${students?.id}`} element={<IndividualStatusTable classes={classes} />} />
      </Routes>
    </Router>
  );
}

export default App;
