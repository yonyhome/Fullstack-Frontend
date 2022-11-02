import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ViewAlumno() {
    const [cursoslist, setCu] = React.useState([])
    useEffect(() => {
       loadCursos();
    }, []);

    const loadCursos = async () => {
        const result = await axios.get("http://localhost:8080/cursos");
        setCu(result.data.reverse());
    }
    const [alumno, setalumno] = React.useState({
        nombre: "",
        facultad: "",
        semestre: "",
        cursos: []
    });
    const {id} = useParams();

    useEffect(() => {
        loadalumno();
        // eslint-disable-next-line
    },[]);
   

    const loadalumno = async () => {
        const result = await axios.get(`http://localhost:8080/alumno/${id}`);
       
        setalumno(result.data);
       
    }
    
return (
    <div className = "container">
        <img src={require('../img/estudiante.png')} className="img-fluid" alt="..." style={{padding: '10px 10px', width: 18 +'rem' }}></img>
        <div className = "row">
            <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                
                <h1 className = "text-center">Detalles del alumno {alumno.nombre}</h1>
                <div className="card">
                    <div className="card-header">
                        alumno ID: {alumno.id}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Nombre: </b>{alumno.nombre} </li>
                            <li className="list-group-item"><b>Semestre: </b>{alumno.semestre} </li>
                            <li className="list-group-item"><b>Facultad: </b>{alumno.facultad} </li>
                            
                        </ul> 
                        
                        
                    </div>
                    <div className = "row">
                        <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2>Listado de cursos registrados para el alumno</h2>
                        <ul>
                            {alumno.cursos.map(curso => <li>{ cursoslist.find(x => x.id === curso.idcurso).nombre}</li>)}
                        </ul>
                        </div>
                    </div>
                    
                </div>
                <Link className="btn btn-primary mt-2" to="/estudiantes">Regresar</Link>
            </div>
        </div>
    </div>
  )
};
