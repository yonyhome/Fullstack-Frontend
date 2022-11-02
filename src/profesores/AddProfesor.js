import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


export default function AddProfesor() {

    let navigate = useNavigate();
    const [cursoslist, setCu] = useState([])
    useEffect(() => {
       loadCursos();
    }, []);

    const loadCursos = async () => {
        const result = await axios.get("http://localhost:8080/cursos");
        setCu(result.data.reverse());
    }
    
    const [datosprofe, setProfesor] = useState({
        nombre: "",
        titulo: "",
        experiencia: "",
        cursos : []
    })

    const {nombre, titulo, experiencia} = datosprofe;

    
    
    const addCursoelegido = (id) => {
        let registro = { 
            idcurso: id,
            name: cursoslist.find(x => x.id === id).nombre
        };
        let nuevoProfesor = { ...datosprofe };
        let newcursos = nuevoProfesor.cursos.concat(registro);
      
        setProfesor({ ...datosprofe, cursos: newcursos });
    };
    const deleteCursoelegido = (id) => {
        const newcursos = datosprofe.cursos.filter((x) => x.idcurso !== id);
        setProfesor({ ...datosprofe, cursos: newcursos });
    }
    
    const onInputChange = e => {
        setProfesor({...datosprofe, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async e => {
        e.preventDefault();
        console.log(datosprofe);
        await axios.post("http://localhost:8080/profesor", datosprofe);
        setProfesor({nombre: "", titulo: "", experiencia: "", cursos: []})
        navigate("/profesores");
    }


    return (
        <div className = "container">
            <div className = "row">
                <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h1 className = "text-center">Registrar nuevo Profesor</h1>
                    <form onSubmit = {e => onSubmit(e)}>
                    
                        <div className='mb-3'>
                            <label htmlFor='nombre' className='form-label'>
                                Nombre
                            </label>
                            <input 
                                type={'text'} 
                                className='form-control' 
                                name='nombre'
                                placeholder='Ingrese el nombre del Profesor'
                                value={nombre}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Titulo' className='form-label'>
                                Maximo titulo academico
                            </label>
                            <input 
                                type={'text'} 
                                className='form-control' 
                                name='titulo'
                                placeholder='Ingrese el titulo academico del Profesor' 
                                value={titulo}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='experiencia' className='form-label'>
                                Años de experiencia
                            </label>
                            <input 
                                type={'integer'} 
                                className='form-control' 
                                name='experiencia'
                                placeholder='Ingrese los años de experiencia del Profesor'
                                value={experiencia}
                                onChange={e => onInputChange(e)}
                                />
                        </div>
                        
                        <button type='submit' className = "btn btn-primary">Registrar</button>
                        <Link className = "btn btn-danger mx-2" to={"/"}>Cancelar</Link>
                    </form>
                </div>
            </div>
            <div className = "row">
                <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2>Lista de cursos ha ser inscritos</h2>
                <ul>
                    {datosprofe.cursos.map((curso) => (
                        <li key={curso.idcurso}>{curso.name}</li>
                    ))}
                </ul>
                </div>
            </div>
            <div className = "row">
                <div className="py-4">
                <h1 className="display-4">Seleccione los Cursos que dicta el profesor</h1>
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
