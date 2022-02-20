import React from 'react';

/* Aca tenog que importar el useState y trabajar con Hooks */


export default function SearchBar(/* aca tenog que pasarle la funcoin que busca */) {
    return (
        <form action="">
            <input
                type="text"
                placeholder='Buscar Raza'
                value="Buscar" /* {raza} */
                /* aca va el onChange para capturar el cambio */
                onChange={function () { }}
            />
            <input
                type="submit"
                value="Agregar"
            />
        </form>
    )

}