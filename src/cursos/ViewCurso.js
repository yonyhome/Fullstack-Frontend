import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Viewcurso() {
    const [curso, setCurso] = React.useState({
        nombre: "",
        requisito: "",
        creditos: "",
        cupos: ""
    })
    const {id} = useParams();
    useEffect(() => {
        loadCurso();
        // eslint-disable-next-line
    }, []);
    const loadCurso = async () => {
        const result = await axios.get(`http://localhost:8080/curso/${id}`);
        setCurso(result.data);
    }
  return (
    <div className = "container">
         <img src={require('../img/cursos.png')} className="img-fluid" alt="..." style={{padding: '10px 10px', width: 18 +'rem' }}></img>
        <div className = "row">
            <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className = "text-center">Detalles por Curso</h1>
                <div className="card">
                    <div className="card-header">
                        Detalles del Curso id: {curso.id}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Nombre: </b>{curso.nombre} </li>
                            <li className="list-group-item"><b>Pre-Requisito: </b>{curso.requisito} </li>
                            <li className="list-group-item"><b>Creditos: </b>{curso.creditos} </li>
                            <li className="list-group-item"><b>Cupos: </b>{curso.cupos} </li>
                        </ul> 
                    </div> 
                </div>
                <Link className="btn btn-primary mt-2" to="/">Regresar</Link>
            </div>
        </div>
    </div>
  )
};
