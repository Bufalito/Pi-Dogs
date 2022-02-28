import React from 'react';
import "./Card.css";




/* { img, name, temperament, peso } */

export default function Card({ nombre, pic, peso, temperamento }) {
    return (
        <div className='perritoDiv'>
            <div className='infoCard'>
                <p>
                    <strong><u>Raza:</u></strong><br /> {nombre} <br />
                    <strong><u>Peso:</u></strong><br /> {peso} (Kg) <br />
                    <strong><u>Temperamentos:</u></strong><br /> {temperamento} <br />
                </p>
            </div>

            <img src={pic} alt="imagen perrito"/>
        </div>
    )

}
