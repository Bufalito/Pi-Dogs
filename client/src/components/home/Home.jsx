import React, { useEffect, useState } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';

import { getRazaInfo, filtroRazasPorTemperamento, getTemperaments, filtroDbOrApi, ordenPorNombre } from '../../actions';

import Nav from '../navBar/Nav';
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginado/Paginado';


export default function Home() {

    const dispatch = useDispatch();
    const allRazas = useSelector((state) => state.razaLoaded)


    //////////////////////////////FILTRADO DE TEMPERAMENTOS///////////////////////////////////
    const allTemperament = useSelector((state) => state.temperamentosRazas)   ////[....]
    /*  console.log(allTemperament) */
    //////////////////////////////FILTRADO DE TEMPERAMENTOS///////////////////////////////////

    const [/* orden */, setOrden] = useState("")


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


    return (
        <div className='fd'>
            {/* <SearchBar /> */}
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
                    <option value="creados">Creados</option>
                    <option value="existentes">Existentes</option>
                </select>

                <select onChange={(e) => handleSort(e)}>
                    <option value="ascendete">Ascendente</option>
                    <option value="descendente">Descendente</option>
                </select>

            </div>

                <div className='asd'>
                    {razasActuales.map(razas => {
                        return (
                            <div key={razas.id} className="divCard">
                                <Link to={`/dogs/${razas.id}`} className="linkDiv" >
                                    <Card pic={razas.url_image} nombre={razas.name} peso={razas.weight} temperamento={razas.temperaments} />
                                </Link>
                            </div>
                        )
                    })}
                </div>

            <Paginado
                razasPorPagina={razasPorPagina}
                allRazas={allRazas.length}
                paginado={paginado}
            />

        </div >
    )

}

