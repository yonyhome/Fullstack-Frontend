import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


export default function AddAlumno() {

    let navigate = useNavigate();
    const [cursoslist, setCu] = useState([])
    useEffect(() => {
       loadCursos();
    }, []);

    const loadCursos = async () => {
        const result = await axios.get("http://localhost:8080/cursos");
        setCu(result.data.reverse());
    }
    
    const [datosalumno, setAlumno] = useState({
        nombre: "",
        facultad: "",
        semestre: "",
        cursos : []
    })

    const {nombre, facultad, semestre} = datosalumno;

    
    
    const addCursoelegido = (id) => {
        let registro = { 
            idcurso: id,
            name: cursoslist.find(x => x.id === id).nombre
        };
        let nuevoalumno = { ...datosalumno };
        let newcursos = nuevoalumno.cursos.concat(registro);
      
        setAlumno({ ...datosalumno, cursos: newcursos });
    };
    const deleteCursoelegido = (id) => {
        const newcursos = datosalumno.cursos.filter((x) => x.idcurso !== id);
        setAlumno({ ...datosalumno, cursos: newcursos });
    }
    
    const onInputChange = e => {
        setAlumno({...datosalumno, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async e => {
        e.preventDefault();
        console.log(datosalumno);
        await axios.post("http://localhost:8080/alumno", datosalumno);
        setAlumno({nombre: "", facultad: "", semestre: "", cursos: []})
        navigate("/estudiantes");
    }


    return (
        <div className = "container">
            <div className = "row">
                <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h1 className = "text-center">Registrar nuevo Alumno</h1>
                    <form onSubmit = {e => onSubmit(e)}>
                    
                        <div className='mb-3'>
                            <label htmlFor='nombre' className='form-label'>
                                Nombre
                            </label>
                            <input 
                                type={'text'} 
                                className='form-control' 
                                name='nombre'
                                placeholder='Ingrese el nombre del alumno'
                                value={nombre}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Titulo' className='form-label'>
                                Facultad a la que pertenece el Alumno
                            </label>
                            <input 
                                type={'text'} 
                                className='form-control' 
                                name='facultad'
                                placeholder='Ingrese la Facultad del Alumno' 
                                value={facultad}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='semestre' className='form-label'>
                                Semestre academico
                            </label>
                            <input 
                                type={'integer'} 
                                className='form-control' 
                                name='semestre'
                                placeholder='Ingrese el semestre del Alumno'
                                value={semestre}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                        
                        <button type='submit' className = "btn btn-primary">Registrar Alumno</button> 
                        <Link className = "btn btn-danger mx-2" to={"/"}>Cancelar</Link>
                    </form>
                </div>
            </div>
            <div className = "row">
                <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2>Lista de cursos ha ser inscritos</h2>
                <ul>
                    {datosalumno.cursos.map((curso) => (
                        <li key={curso.idcurso}>{curso.name}</li>
                    ))}
                </ul>
                </div>
            </div>
            <div className = "row">
                <div className="py-4">
                <h1 className="display-4">Seleccione los Cursos que quiere registrar para este Alumno</h1>
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
                                cursoslist.map((curso, index) => (
                                    <tr >
                                        
                                        <th scope="row">{index + 1}</th>
                                        <td>{curso.nombre}</td>
                                        <td>{curso.requisito}</td>
                                        <td>{curso.creditos}</td>
                                        <td>{curso.cupos}</td>
                                        <td>
                                            <button 
                                                className="View btn btn-primary mr-2"
                                                onClick={() => addCursoelegido(curso.id) }
                                                >Añadir
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteCursoelegido(curso.id) }
                                                >Quitar
                                            </button>
                                        </td>
                                    </tr>
                                ))


                            }
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    

    )
}
