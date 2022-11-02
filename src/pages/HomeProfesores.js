import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function HomeProfesores() {
    const [profesores, setProfesor] = React.useState([])
    useEffect(() => {
       loadProfesores();
    }, []);

    const loadProfesores = async () => {
        const result = await axios.get("http://localhost:8080/profesores");
        setProfesor(result.data.reverse());
    }
    const deleteProfesor = async id => {
        await axios.delete(`http://localhost:8080/profesor/${id}`);
        loadProfesores();
    }
  return (
    <div className='container'>
        <img src={require('../img/profesor.png')} className="img-fluid" alt="..." style={{padding: '10px 10px', width: 18 +'rem' }}></img>
        <h1>Listado de Profesores registrados en la base de datos</h1>
        <Link className="btn btn-primary mr-2" to={`/addprofesor/`}>Registrar nuevo Profesor</Link>
        
        <div className="py-4">
            <table className="table border shadow">
                
                <thead>
                
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Años Experiencia</th>
                    <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        profesores.map((profesor, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{profesor.nombre}</td>
                                <td>{profesor.titulo}</td>
                                <td>{profesor.experiencia}</td>
                                <td>
                                    <Link className="btn btn-primary mr-2"
                                    to={`/viewprofesor/${profesor.id}`}>ver</Link>

                                    <Link className="btn btn-outline-primary mx-2" 
                                    to={`/editprofesor/${profesor.id}`}>Editar</Link>
                                    <button 
                                    className="btn btn-danger"
                                    onClick={() => deleteProfesor(profesor.id)}
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
