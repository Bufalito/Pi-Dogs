import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postFormulario, getTemperaments } from "../../actions/index"
import { useDispatch, useSelector } from "react-redux";

import "./Formulario.css"

export default function Formulario() {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperamentos = useSelector((state) => state.temperamentosRazas)

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: [],
        url_image: "",
    })


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        /*  console.log(input) */
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        /* console.log("hanldesubmit", input.temperaments) */
        dispatch(postFormulario(input))
        alert("Raza creada con exito!")
        setInput({
            name: "",
            height: "",
            weight: "",
            life_span: "",
            temperament: [],
            url_image: "",
        })
        history.push("/home")
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    return (
        <div>
            <h1>Soy el formulario.</h1>
            <div>
                <Link to="/home">
                    <button>Volver!</button>
                </Link>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="formulario">
                <div className="divForm">
                    <h4>FORMULARIO</h4>

                    <input
                        type="text"
                        placeholder="Nombre"
                        id="nombre"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    /> <br /> {/* Nombre de la raza */}


                    <input
                        type="number"
                        placeholder="Peso"
                        id="peso"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => handleChange(e)}
                    /> <br /> {/* Peso de la raza */}


                    <input
                        type="number"
                        placeholder="Altura"
                        id="altura"
                        value={input.height}
                        name="height"
                        onChange={handleChange}
                    /> <br /> {/* Altura de la raza */}


                    <input
                        type="number"
                        placeholder="Esperanza de vida"
                        id="esperanzaVida"
                        value={input.life_span}
                        name="life_span"
                        onChange={handleChange}
                    /> <br /> {/* Esperanza de vida de la raza */}

                    {/* <label>Temperamentos:</label>
                    <input
                        type="text"
                        placeholder="Temperamentos"
                        id="temperamentos"
                        value={input.temperaments}
                        name="temperaments"
                    /> <br /> {/* Temperamentos de la raza */}

                    <input
                        type="text"
                        placeholder="Imagen.jpg"
                        id="img"
                        value={input.url_image}
                        name="url_image"
                        onChange={handleChange}
                    /> <br /> {/* Imagen de la raza */}

                    <select onChange={(e) => handleSelect(e)}>
                        {temperamentos.map((el) => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))}
                    </select> <br />
                    <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>

                    <input type="submit" value="Crear" />
                </div>
            </form>

            {/*  <div className='cardFormulario' >
                <h3 id="raza">Raza:{creadoCard()} <br /> </h3>
                <h5>Peso:  Kg</h5>
                <h5>Altura:  </h5>
                <h6>Años de vida:  </h6>
                <p><u> Temperamentos: </u> <br /> </p>
                <img src="" alt="imagen perrito" className='imgForm' />
            </div> */}
        </div>
    )
}