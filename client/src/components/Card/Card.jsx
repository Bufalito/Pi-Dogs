import React from 'react';
import "./Card.css";




/* { img, name, temperament, peso } */

export default function Card({ nombre, pic, peso, temperamento }) {
    return (
        <div className='perritoDiv' >
            <h3>Raza: <br /> {nombre}</h3> {/* /dogs/${id} */}
            <h5>Peso: {peso} Kg</h5>
            <p><u> Temperamentos: </u> <br /> {temperamento}</p>
            <img src={pic} alt="imagen perrito" className='imgDiv' />

        </div>
    )

}