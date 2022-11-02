import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import HomeCurso from './pages/HomeCurso';
import AddCurso from './cursos/AddCurso';
import EditCurso from './cursos/EditCurso';
import ViewCurso from './cursos/ViewCurso';

import HomeProfesor from './pages/HomeProfesores';
import AddProfesor from './profesores/AddProfesor';
import EditProfesor from './profesores/EditProfesor';
import ViewProfesor from './profesores/ViewProfesor';

import HomeAlumno from './pages/HomeAlumno';
import AddAlumno from './alumnos/AddAlumno';
import EditAlumno from './alumnos/EditAlumno';
import ViewAlumno from './alumnos/ViewAlumno';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cursos" element={<HomeCurso />} />
          <Route exact path="/addcurso" element={<AddCurso />} />
          <Route exact path="/editcurso/:id" element={<EditCurso />} />
          <Route exact path="/viewcurso/:id" element={<ViewCurso />} />

          <Route exact path="/profesores" element={<HomeProfesor />} />
          <Route exact path="/addprofesor" element={<AddProfesor />} />
          <Route exact path="/editprofesor/:id" element={<EditProfesor />} />
          <Route exact path="/viewprofesor/:id" element={<ViewProfesor />} />

          <Route exact path='/estudiantes' element = {<HomeAlumno/>} />
          <Route exact path="/addestudiante" element={<AddAlumno />} />
          <Route exact path="/editestudiante/:id" element={<EditAlumno />} />
          <Route exact path="/viewestudiante/:id" element={<ViewAlumno />} />
        </Routes>
      
      </Router>

    </div>
  );
}

export default App;
