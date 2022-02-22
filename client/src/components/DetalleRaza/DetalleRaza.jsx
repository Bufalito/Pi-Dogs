import React, { useEffect } from 'react';
import "./DetalleRaza.css";

import { getDetalleRaza } from '../../actions';
import { useParams } from 'react-router-dom';

import Nav from '../navBar/Nav';
import CardDetalle from '../CardDetalle/CardDetalle';
import { useDispatch, useSelector } from 'react-redux';


export default function DetalleRaza() {

    const dispatch = useDispatch();
    const detalleRaza = useSelector((state) => state.detalleRaza)
    const { id } = useParams();



    useEffect(() => {
        dispatch(getDetalleRaza(id))
    },[dispatch, id]);

    return (
        <div >
            <Nav />

            {detalleRaza.map(raza => {
                return (
                    <div key={raza.id}>
                        <CardDetalle pic={raza.url_image} nombre={raza.name} altura={raza.height} peso={raza.weight} temperamento={raza.temperaments} añosDeVida={raza.life_span} />
                    </div>
                )

            })}

        </div>
    )

}