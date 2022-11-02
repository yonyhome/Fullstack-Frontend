import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function HomeAlumno() {
    const [alumnos, serAlumno] = React.useState([])
    useEffect(() => {
       loadAlumnos();
    }, []);

    const loadAlumnos = async () => {
        const result = await axios.get("http://localhost:8080/alumnos");
        serAlumno(result.data.reverse());
    }
    const deleteAlumno = async id => {
        await axios.delete(`http://localhost:8080/alumno/${id}`);
        loadAlumnos();
    }
  return (
    <div className='container'>
        <img src={require('../img/estudiante.png')} className="img-fluid" alt="..." style={{padding: '10px 10px', width: 18 +'rem' }}></img>
        <h1>Listado de Alumnos que se han registrados en la base de datos</h1>
        <Link className="btn btn-primary mr-2" to={`/addestudiante/`}>Registrar nuevo Alumno</Link>
        
        <div className="py-4">
            <table className="table border shadow">
                
                <thead>
                
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Facultad</th>
                    <th scope="col">Semestre</th>
                    <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alumnos.map((alumno, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.facultad}</td>
                                <td>{alumno.semestre}</td>
                                <td>
                                    <Link className="btn btn-primary mr-2"
                                    to={`/viewestudiante/${alumno.id}`}>ver</Link>

                                    <Link className="btn btn-outline-primary mx-2" 
                                    to={`/editestudiante/${alumno.id}`}>Editar</Link>
                                    <button 
                                    className="btn btn-danger"
                                    onClick={() => deleteAlumno(alumno.id)}
                                    >Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                </tbody>
            </table>
        
        </div>
    </div>
  )
}
