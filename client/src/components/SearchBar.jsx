import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRazaSearch } from '../actions'
import "./navBar/Nav.css"


export default function SearchBar() {
    const dispatch = useDispatch()
    const location = useLocation()
   /*  console.log(location) */
    const sitio = location.pathname
    const [raza, setRaza] = useState("")


    function onChange(e) {
        e.preventDefault()
        setRaza(e.target.value)
    }
    console.log(raza)


    function onSubmit(e) {
        e.preventDefault()
        dispatch(getRazaSearch(raza))

        document.getElementById("busqueda").value = ""

    }

    if (sitio === "/home") {
        return (
            <form >
                <div className='search'>
                    <input
                        id="busqueda"
                        type="text"
                        placeholder='Buscar Raza'
                        onChange={(e) => onChange(e)}
                    />
                    <input id='input2' type="submit" value="Buscar" onClick={onSubmit} className="btnSearch" />
                </div>
            </form >
        )
    } else {
        return (
            <div></div>
        )
    }

}

