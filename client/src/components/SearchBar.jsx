import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRazaSearch } from '../actions'
import "./navBar/Nav.css"
/* Aca tenog que importar el useState y trabajar con Hooks */

export default function SearchBar(/* aca tenog que pasarle la funcoin que busca */) {
    const dispatch = useDispatch()
    const [raza, setRaza] = useState("")

    function onChange(e) {
        e.preventDefault()
        setRaza(e.target.value)
        /* dispatch(getRazaSearch(raza)) */
    }
    console.log(raza)

    function onSubmit(e) {
        e.preventDefault()
        dispatch(getRazaSearch(raza))
        document.getElementById("busqueda").value = ""

    }


    return (
        <form >
            <div className='search'>
            <input
                id="busqueda"
                type="text"
                placeholder='Buscar Raza'
                onChange={(e) => onChange(e)}
            />
            <input id='input2' type="submit" value="Buscar" onClick={onSubmit} />
            </div>
        </form >
    )
}

