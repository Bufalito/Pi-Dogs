import React from 'react';

/* Aca tenog que importar el useState y trabajar con Hooks */


export default function SearchBar(/* aca tenog que pasarle la funcoin que busca */) {

    return (
        <form >
            <input
                type="text"
                placeholder='Buscar Raza'
            />
                <input type="submit" value="Buscar" />
        </form>
    )

}
