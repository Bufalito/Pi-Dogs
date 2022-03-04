import React from "react";
import "./Paginado.css"

export default function Paginado({ razasPorPagina, allRazas, paginado}) {
    const numeroPagina = []

    for (var i = 1; i <= Math.ceil(allRazas / razasPorPagina); i++) {
        numeroPagina.push(i)

    }

    return (
        <nav>
            <ul className="paginado">
                {
                    numeroPagina && numeroPagina.map(number => {
                        return (
                            <li className="number" key={number}>
                                <button onClick={() => paginado(number)} className="btnPaginado" >{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav >
    )
}