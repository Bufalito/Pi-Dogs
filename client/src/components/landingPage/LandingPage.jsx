import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";

export default function LandingPage() {
    return (
        <div className='landing'>
            <Link to="/home"> <button>Home!</button> </Link>
        </div>
    )

}