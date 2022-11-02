import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    
    <div className="container" style={{padding: '50px' }}>
        <div className="row">
            <div className="col">
              <div className="card" style={{width: 18 +'rem'}} >
                <img src={require('../img/cursos.png')} alt="..." style={{padding: '10px 30px' }}></img>
                <h5 className="card-title">Cursos</h5>
                <div className="card-body">
                  <Link to="/cursos" className="btn btn-primary">Ver Cursos</Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{width: 18 +'rem'}} > 
                  <img src={require('../img/estudiante.png')} className="img-fluid" alt="..." style={{padding: '10px 30px' }}></img>
                  <h5 className="card-title">Estudiantes</h5>
                  <div className="card-body">
                    <Link to="/estudiantes" className="btn btn-primary">Ver Estudiantes</Link>
                  </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{width: 18 +'rem'}} > 
                  <img src={require('../img/profesor.png')} className="img-fluid" alt="..." style={{padding: '10px 30px' }}></img>
                  <h5 className="card-title">Profesores</h5>
                  <div className="card-body">
                    <Link to="/profesores" className="btn btn-primary">Ver Profesores</Link>
                  </div>
              </div>
            </div>
            
        </div>
    </div>
  )
}

//<img src="https://cdn.pixabay.com/photo/2014/04/03/09/59/teacher-309533_960_720.png" className="img-fluid" alt="..."></img>