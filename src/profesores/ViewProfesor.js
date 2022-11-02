import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ViewProfesor() {
    const [cursoslist, setCu] = React.useState({
        nombre: "",
        requisito: "",
        creditos: "",
        cupos: ""
    })
    useEffect(() => {
       loadCursos();
    }, []);

    const loadCursos = async () => {
        const result = await axios.get("http://localhost:8080/cursos");
        setCu(result.data.reverse());
    }
    const [profesor, setProfesor] = React.useState({
        nombre: "",
        titulo: "",
        experiencia: "",
        cursos: []
    });
    const {id} = useParams();

    useEffect(() => {
        loadProfesor();
    },[]);

    const loadProfesor = async () => {
        const result = await axios.get(`http://localhost:8080/profesor/${id}`);
       
        setProfesor(result.data);
       
    }
    
    function nombre (id) {
        return cursoslist.find(x => x.id === id).nombre
    }
    

    
        
    
  return (
    <div className = "container">
        <img src={require('../img/profesor.png')} className="img-fluid" alt="..." style={{padding: '10px 10px', width: 18 +'rem' }}></img>
        <div className = "row">
            <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                
                <h1 className = "text-center">Detalles del profesor {profesor.nombre}</h1>
                <div className="card">
                    <div className="card-header">
                        Profesor ID: {profesor.id}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Nombre: </b>{profesor.nombre} </li>
                            <li className="list-group-item"><b>Titulo: </b>{profesor.titulo} </li>
                            <li className="list-group-item"><b>experiencia: </b>{profesor.experiencia} Años </li>
                            
                        </ul> 
                        
                        
                    </div>
                    <div className = "row">
                        <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2>Listado de cursos que dicta el Docente</h2>
                        <ul>
                            {console.log("profesorcurso", profesor.cursos)}
                            {console.log("cursoslist", cursoslist)}
                            {profesor.cursos.map(curso => <li>{ cursoslist.find(x => x.id === curso.idcurso).nombre}</li>)}
                            
                            
                        </ul>
                        </div>
                    </div>
                    
                </div>
                <Link className="btn btn-primary mt-2" to="/profesores">Regresar</Link>
            </div>
        </div>
    </div>
  )
};
