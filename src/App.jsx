import { StudentsList } from './pages/Students';
import { Classes } from './pages/Classes';
import { GeneralStatus } from './pages/GeneralStatus';
import { IndividualStatusTable } from './pages/IndividualStatusTable';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import logo from './assets/car-icon.png';
import './App.css';


function App() {

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
        <Route path='/students' element={<StudentsList />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/general-status' element={<GeneralStatus />} />
        <Route path={`/students/:${students?.id}`} element={<IndividualStatusTable />} />
      </Routes>
    </Router>
  );
}

export default App;
