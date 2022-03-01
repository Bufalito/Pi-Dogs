import React from 'react';
/* import logo from "../../../dog.png"; */
import "./Nav.css";

import SearchBar from '../SearchBar';
import logo from "../../img/dog.png"
import perritoRun from "../../img/480.gif"
import { Link } from 'react-router-dom';



export default function Nav(/* Aca voy a tener que pasar una funcion que busque los perros */) {
    return (
        <nav className='nav'>
            <Link to="/home" className="logo">
                <span>
                    <img src={logo} alt="img de perritos" className='img' />
                </span>
            </Link>
            <img src={perritoRun} alt="perritoRun" className='gifNav'/>
            <SearchBar />
        </nav>
    )

}