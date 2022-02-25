import React from 'react';
import "./Card.css";




/* { img, name, temperament, peso } */

export default function Card({ nombre, pic, peso, temperamento }) {
    return (
        <div className='perritoDiv'>

            <p>
                Raza: {nombre} <br />
                Peso: {peso} <br />
                Temperamentos: {temperamento} <br />
            </p>

            {/* <h3>Raza: <br /> {nombre}</h3>
            <h5>Peso: {peso} Kg</h5>
            <p className='testoTemp'><u> Temperamentos: </u> <br /> {temperamento}</p> */}
            <img src={pic} alt="imagen perrito" />
        </div>
    )

}
