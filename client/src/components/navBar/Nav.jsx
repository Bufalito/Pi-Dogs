import React from 'react';
/* import logo from "../../../dog.png"; */
import "./Nav.css";

import SearchBar from '../SearchBar';
import logo from "../../img/dog.png"



export default function Nav(/* Aca voy a tener que pasar una funcion que busque los perros */) {
    return (
        <nav className='nav'>
            <span>
                <img src={logo} alt="img de perritos" className='img' />
            </span>

            <span>
                About!
            </span>

            <SearchBar />
        </nav>
    )

}