import React, { useEffect, useState } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';

import { getRazaInfo, filtroRazasPorTemperamento, getTemperaments, filtroDbOrApi, ordenPorNombre, ordenPorPeso } from '../../actions';

import Nav from '../navBar/Nav';
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginado/Paginado';
import loading from "../../img/482.gif"
import logoDefault from "../../img/dog.png"


export default function Home() {

    const dispatch = useDispatch();
    const allRazas = useSelector((state) => state.razaLoaded)


    //////////////////////////////FILTRADO DE TEMPERAMENTOS///////////////////////////////////
    const allTemperament = useSelector((state) => state.temperamentosRazas)   ////[....]
    /*  console.log(allTemperament) */
    //////////////////////////////FILTRADO DE TEMPERAMENTOS///////////////////////////////////

    const [/* orden */, setOrden] = useState("")
    const [/* ordenPeso */, setOrdenPeso] = useState("")


    ////////////////////////////PAGINADO////////////////////////////////////
    const [paginaActual, setPaginaActual] = useState(1)
    const [razasPorPagina, /* setRazasPorPagina */] = useState(8)
    const indiceDeUltimaRaza = paginaActual * razasPorPagina
    const indiceDePrimerRaza = indiceDeUltimaRaza - razasPorPagina
    const razasActuales = allRazas.slice(indiceDePrimerRaza, indiceDeUltimaRaza)

    const paginado = (numeroPagina) => {
        setPaginaActual(numeroPagina)
    }
    ////////////////////////////PAGINADO////////////////////////////////////

    useEffect(() => {
        dispatch(getRazaInfo())
        dispatch(getTemperaments())
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRazaInfo())
        setPaginaActual(1);
    }

    function handleFilter(e) {
        dispatch(filtroRazasPorTemperamento(e.target.value))
    }

    function handleFilterDbOrApi(e) {
        dispatch(filtroDbOrApi(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(ordenPorNombre(e.target.value));

        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSort2(e) {
        e.preventDefault();
        dispatch(ordenPorPeso(e.target.value))
        setPaginaActual(1);

        setOrdenPeso(`OrdenadoPorPeso ${e.target.value}`)
    }


    return (
        <div className='fd'>

            <Nav />
            <div className='botonesHome'>
                <h1 className='titulo'><div className='textTitulo'>Individual Project - Henry Dogs</div></h1>
                <button onClick={e => { handleClick(e) }} >
                    Recargar razas
                </button>

                <Link to={"/formulario"}>
                    <button >
                        Crear nueva raza
                    </button>
                </Link>

            </div>
            <div className='selectsHome'>
                <select onChange={(e) => handleFilter(e)}>
                    <option value="Todas las razas">Todos los temperamentos</option>
                    {allTemperament && allTemperament.map(el => (
                        <option key={el.id} value={el.name}>{el.name}</option>
                    ))}
                </select>

                <select onChange={(e) => handleFilterDbOrApi(e)} id="asd">
                    <option value="todos">Todos</option>
                    <option value="creados">Razas creadas</option>
                    <option value="existentes">Razas existentes</option>
                </select>

                <select onChange={(e) => handleSort(e)}>
                    <option value="ascendete">A-Z</option>
                    <option value="descendente">Z-A</option>
                </select>

                <select onChange={(e) => handleSort2(e)}>
                    <option value="mayorPeso"> Mayor Peso</option>
                    <option value="menorPeso"> Menor Peso</option>
                </select>

            </div>

            <div className='asd'>
                {allRazas.length ?
                    razasActuales.map(razas => {
                        return (
                            <div key={razas.id} className="divCard">
                                <Link to={`/dogs/${razas.id}`} className="linkDiv" >
                                    <Card pic={razas.url_image ? razas.url_image : logoDefault} nombre={razas.name} peso={razas.weight} temperamento={razas.temperaments} />
                                </Link>
                            </div>
                        )
                    })
                    : <img src={loading} alt="" className='imgLoading' />}

            </div>

            <Paginado
                razasPorPagina={razasPorPagina}
                allRazas={allRazas.length}
                paginado={paginado}
            />

        </div >
    )

}

