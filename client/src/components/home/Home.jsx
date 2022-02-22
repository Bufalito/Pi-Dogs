import React, { useEffect, useState } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';

import { getRazaInfo, filtroRazasPorTemperamento, getTemperaments } from '../../actions';

import Nav from '../navBar/Nav';
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginado/Paginado';



export default function Home() {

    const dispatch = useDispatch();
    const allRazas = useSelector((state) => state.razaLoaded)

    const allTemperament = useSelector((state) => state.temperamentosRazas)   ////[....]
    console.log(allTemperament)

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

    return (
        <div >
            <Nav />
            <button onClick={e => { handleClick(e) }}>
                Recargar razas.
            </button>

            <select onChange={(e) => handleFilter(e)}>
                <option value="Todas las razas">Todos los temperamentos</option>
                {allTemperament && allTemperament.map(el => (
                    <option key={el.id} value={el.name}>{el.name}</option>
                ))}
            </select>

            <select>
                <option value="mayorPeso">
                    Mayor Peso
                </option>
                <option value="menorPeso">
                    Menor Peso
                </option>
            </select>

            <Paginado
                razasPorPagina={razasPorPagina}
                allRazas={allRazas.length}
                paginado={paginado}
            />


            {razasActuales.map(razas => {
                return (
                    <div key={razas.id}>
                        <Link to={`/dogs/${razas.id}`} >
                            <Card pic={razas.url_image} nombre={razas.name} peso={razas.weight} temperamento={razas.temperaments} />
                        </Link>
                    </div>

                )

            })}

        </div >
    )

}