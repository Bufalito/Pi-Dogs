import React from 'react';
import "./CardDetalle.css";




export default function CardDetalle({ nombre, pic, peso, temperamento, altura, añosDeVida }) {
    console.log("temparamento que llega", temperamento)
    return (
        <div className='divDetalle'>
            <div className='perritoDiv' >

                <img src={pic} alt="imagen perrito" className='imgDiv' />
            </div>

            <div className='textCardDetalle'>
                <h3><u>Raza:</u> <br /> {nombre}</h3>
                <h4><u>Peso:</u> {peso} (Kg)</h4>
                <h4><u>Altura:</u> {altura} (Cm)</h4>
                <h4><u>Años de vida:</u> {añosDeVida} </h4>
                <u> Temperamentos: </u> <br />
                {temperamento?.split(", ").map(e => (
                    <ul><li key={e}>{e}</li></ul>
                ))}

            </div>
        </div >
    )

}