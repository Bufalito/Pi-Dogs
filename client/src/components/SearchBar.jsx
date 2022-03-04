import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
/* import { useHistory } from 'react-router-dom'; */
import { getRazaSearch } from '../actions'
import "./navBar/Nav.css"


export default function SearchBar() {
    const dispatch = useDispatch()
    /* const history = useHistory() */
    const [raza, setRaza] = useState("")

    function onChange(e) {
        e.preventDefault()
        setRaza(e.target.value)
        /* dispatch(getRazaSearch(raza)) */
    }
    console.log(raza)


    //provar primero redireccionar y despues mostrar
    function onSubmit(e) {
        e.preventDefault()
        dispatch(getRazaSearch(raza))
        /* history.push("/home")    esto es importante solucionarlo*/
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
            <input id='input2' type="submit" value="Buscar" onClick={onSubmit} className="btnSearch"/>
            </div>
        </form >
    )
}

