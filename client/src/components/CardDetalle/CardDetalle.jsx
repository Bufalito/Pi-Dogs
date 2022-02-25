import React from 'react';
import "./CardDetalle.css";




export default function CardDetalle({ nombre, pic, peso, temperamento, altura, añosDeVida }) {
    return (
        <div className='perritoDiv' >
            <h3>Raza: <br /> {nombre}</h3>
            <h5>Peso: {peso} Kg</h5>
            <h5>Altura: {altura} </h5>
            <h6>Años de vida: {añosDeVida} </h6>
            <p><u> Temperamentos: </u> <br /> {temperamento}</p>
            <img src={pic} alt="imagen perrito" className='imgDiv' />
            <button>Home!</button>
        </div>
    )

}