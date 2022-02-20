import React, { useEffect } from 'react';
import "./Home.css";

import { getRazaInfo } from '../../actions';

import Nav from '../navBar/Nav';
import Card from '../Card.jsx/Card';
import { useDispatch, useSelector } from 'react-redux';


export default function Home() {

    const dispatch = useDispatch();
    const allRazas = useSelector((state) => state.razaLoaded)

    useEffect(() => {
        dispatch(getRazaInfo())
    }, [dispatch]);

    return (
        <div >
            <Nav />

            {allRazas.map(razas => {
                return (
                    <div key={razas.id}>
                        <Card pic={razas.url_image} nombre={razas.name} peso={razas.weight} temperamento={razas.temperaments} />
                    </div>
                )

            })}

        </div>
    )

}