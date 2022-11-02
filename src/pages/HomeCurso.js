import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function HomeCurso() {
    const [cursos, setCursos] = React.useState([])
    useEffect(() => {
       loadCursos();
    }, []);

    const loadCursos = async () => {
        const result = await axios.get("http://localhost:8080/cursos");
        setCursos(result.data.reverse());
    }
    const deleteCurso = async id => {
        await axios.delete(`http://localhost:8080/curso/${id}`);
        loadCursos();
    }
  return (
    <div className='container'>
         <img src={require('../img/cursos.png')} className="img-fluid" alt="..." style={{padding: '10px 10px', width: 18 +'rem' }}></img>
         <h1>Listado de Cursos que se han registrados en la base de datos</h1>
        <Link className="btn btn-primary mr-2" to={`/addcurso/`}>Registrar nuevo curso</Link>
        
        <div className="py-4">
            <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">PreRequisito</th>
                    <th scope="col">#Creditos</th>
                    <th scope="col">Cupos</th>
                    <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cursos.map((curso, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{curso.nombre}</td>
                                <td>{curso.requisito}</td>
                                <td>{curso.creditos}</td>
                                <td>{curso.cupos}</td>
                                <td>
                                    <Link className="btn btn-primary mr-2"
                                    to={`/viewcurso/${curso.id}`}>ver</Link>

                                    <Link className="btn btn-outline-primary mx-2" 
                                    to={`/editcurso/${curso.id}`}>Editar</Link>
                                    <button 
                                    className="btn btn-danger"
                                    onClick={() => deleteCurso(curso.id)}
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
