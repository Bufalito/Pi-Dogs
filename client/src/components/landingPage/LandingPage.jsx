import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";
import imagen from "../../img/welcome1.png";


export default function LandingPage() {
    return (
        <div className='landing'>
            <Link to="/home"  className="link">
                <img src={imagen} alt="imagen logo" className="imgWelcome" />
            </Link>
        </div>
    )

}