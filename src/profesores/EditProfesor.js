import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function EditCurso() {
    let navigate = useNavigate();

    const {id} = useParams();
    const [curso, setCurso] = React.useState({
        nombre: "",
        requisito: "",
        creditos: "",
        cupos: ""
    })
    const {nombre, requisito, creditos, cupos} = curso;
    const onInputChange = e => {
        setCurso({...curso, [e.target.name]: e.target.value})
    };
    useEffect(() => {
        loadCurso();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/curso/${id}`, curso);
        
        navigate("/");
    }
    const loadCurso = async () => {
        const result = await axios.get(`http://localhost:8080/curso/${id}`);
        setCurso(result.data);
    }
  return (
    <div className = "container">
        <div className = "row">
            <div className = "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className = "text-center">Editar Curso</h1>
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
            </div>
        </div>
    </div>
  )
}