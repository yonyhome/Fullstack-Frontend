import React, { useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


export default function AddCurso() {
    let navigate = useNavigate();
    const [curso, setCurso] = React.useState({
        nombre: "",
        requisito: "",
        creditos: "",
        cupos: "",
        alumnos: [],
        profesores: []
    })

    const {nombre, requisito, creditos, cupos} = curso;
    const onInputChange = e => {
        setCurso({...curso, [e.target.name]: e.target.value})
    }
    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:8080/curso", curso);
        setCurso({nombre: "", requisito: "", creditos: "", cupos: "", alumnos:[], profesores: []})
        navigate("/cursos");
    }
    const [profesores, setProfesor] = React.useState([])
    useEffect(() => {
       loadProfesores();
    }, []);

    const loadProfesores = async () => {
        const result = await axios.get("http://localhost:8080/profesores");
        setProfesor(result.data.reverse());
    }

    const [alumnos, serAlumno] = React.useState([])
    useEffect(() => {
       loadAlumnos();
    }, []);

    const loadAlumnos = async () => {
        const result = await axios.get("http://localhost:8080/alumnos");
        serAlumno(result.data.reverse());
    }
    const addAlumnoelegido = (id) => {
        let registro = {
            idalumno: id,
            name: alumnos.find(x => x.id === id).nombre
        };
        let nuevoalumno = { ...curso };
        let newalumnos = nuevoalumno.alumnos.concat(registro);
        setCurso({ ...curso, alumnos: newalumnos });
    };
    const deleteAlumnoelegido = (id) => {
        const newalumnos = curso.alumnos.filter((x) => x.idalumno !== id);
        setCurso({ ...curso, alumnos: newalumnos });
    }
    const addProfesorelegido = (id) => {
        let registro = {
            idprofesor: id,
            name:  profesores.find(x => x.id === id).nombre
        };
        let nuevoprofesor = { ...curso };
        let newprofesor = nuevoprofesor.profesores.concat(registro);
      
        setCurso({ ...curso, profesores: newprofesor });
    };
    
    const deleteProfesorelegido = (id) => {
        const newprofesor = curso.profesores.filter((x) => x.idprofesor !== id);
        setCurso({ ...curso, profesores: newprofesor });
    }
  return (
    <div className = "container">
        <div className = "row">
            <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className = "text-center">Registrar Curso</h1>
                <form onSubmit = {e => onSubmit(e)}>
                
                    <div className='mb-3'>
                        <label htmlFor='nombre' className='form-label'>
                            Nombre
                        </label>
                        <input 
                            type={'text'} 
                            className='form-control' 
                            name='nombre'
                            placeholder='Ingrese el nombre del curso'
                            value={nombre}
                            onChange={e => onInputChange(e)}
                            />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='requisito' className='form-label'>
                            Pre-Requisito
                        </label>
                        <input 
                            type={'text'} 
                            className='form-control' 
                            name='requisito'
                            placeholder='Ingrese el prerequisito del curso' 
                            value={requisito}
                            onChange={e => onInputChange(e)}
                            />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='creditos' className='form-label'>
                            # de Creditos
                        </label>
                        <input 
                            type={'integer'} 
                            className='form-control' 
                            name='creditos'
                            placeholder='Ingrese # creditos del curso'
                            value={creditos}
                            onChange={e => onInputChange(e)}
                            />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='cupos' className='form-label'>
                            # de Cupos
                        </label>
                        <input 
                            type={'integer'} 
                            className='form-control' 
                            name='cupos'
                            placeholder='Ingrese # creditos del curso'
                            value={cupos}
                            onChange={e => onInputChange(e)}
                            />
                    </div>
                    <button type='submit' className = "btn btn-primary">Registrar</button>
                    <Link className = "btn btn-danger mx-2" to={"/"}>Cancelar</Link>
                </form>
                <div className = "row">
                    <div className = "col-md-6 border rounded shadow">
                        <h2>Profesores que se van a vincular a este curso</h2>
                        <ul>
                            {curso.profesores.map((profe) => (
                                <li key={profe.idprofesor}>{profe.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className = "col-md-6 border rounded shadow">
                        <h2>Alumnos que se van a vincular a este curso</h2>
                        <ul>
                            {curso.alumnos.map((alumno) => (
                                <li key={alumno.idalumno}>{alumno.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className = "row">
                <div className="py-4">
                <h1 className="display-4">Seleccione los Profesores que dictan este curso</h1>
                    <table className="table border shadow">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Experiencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                profesores.map((profe, index) => (
                                    <tr >
                                        <th scope="row">{profe.id}</th>
                                        <td>{profe.nombre}</td>
                                        <td>{profe.titulo}</td>
                                        <td>{profe.experiencia}</td>
                                        <td>
                                            <button 
                                                className="View btn btn-primary mr-2"
                                                onClick={() => addProfesorelegido(profe.id) }
                                                >Añadir
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteProfesorelegido(profe.id) }
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
            <div className = "row">
                <div className="py-4">
                <h1 className="display-4">Seleccione los Alumnos que estan en este curso</h1>
                    <table className="table border shadow">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Facultad</th>
                            <th scope="col">Semestre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alumnos.map((alumno, index) => (
                                    <tr >
                                        <th scope="row">{alumno.id}</th>
                                        <td>{alumno.nombre}</td>
                                        <td>{alumno.facultad}</td>
                                        <td>{alumno.semestre}</td>
                                        <td>
                                            <button 
                                                className="View btn btn-primary mr-2"
                                                onClick={() => addAlumnoelegido(alumno.id) }
                                                >Añadir
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteAlumnoelegido(alumno.id) }
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
        </div>
    </div>
  )
}
