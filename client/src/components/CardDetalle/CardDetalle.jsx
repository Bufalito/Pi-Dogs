import React from 'react';
import "./CardDetalle.css";




export default function CardDetalle({ nombre, pic, peso, temperamento, altura, añosDeVida }) {
    /* console.log(temperamento) */
    return (
        <div className='divDetalle'>
            <div className='perritoDiv' >

                <img src={pic} alt="imagen perrito" className='imgDiv' />
            </div>

            <div>
                <h3>Raza: <br /> {nombre}</h3>
                <h5>Peso: {peso} (Kg)</h5>
                <h5>Altura: {altura} (Cm)</h5>
                <h6>Años de vida: {añosDeVida} </h6>
                <p><u> Temperamentos: </u> <br /> {temperamento}</p>
            </div>
        </div>
    )

}