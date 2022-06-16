import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postFormulario, getTemperaments } from "../../actions/index"
import { useDispatch, useSelector } from "react-redux";

import "./Formulario.css"
import Card from "../Card/Card";
import logo from "../../img/dog.png"
import Nav from "../navBar/Nav";


function validacion(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Se requiere nombre"
    }
    if (!input.weight) {
        errors.weight = "Se requiere peso"
    }
    if (!input.height) {
        errors.height = "Se requiere una altura"
    }
    if (!input.temperament.length) {
        errors.temperament = "Se requiere al menos un temperamento"
    }
    return errors
}





export default function Formulario() {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperamentos = useSelector((state) => state.temperamentosRazas)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        height: "",
        promedio: "",
        life_span: "",
        temperament: [],
        url_image: "",
    })
    /* console.log(input) */


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        /*  console.log(input) */
        setErrors(validacion({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        /* console.log(e.target.value) */
        if (input.temperament.includes(e.target.value)) {
            alert("Ya seleccionaste ese temperamento capo!")
        } else {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
        document.getElementById("selectT").value = "Temperamentos"
    }
    function handleSubmit(e) {
        e.preventDefault();
        /* console.log("hanldesubmit", input.temperaments) */
        dispatch(postFormulario(input))
        alert("Raza creada con exito!")
        setInput({
            name: "",
            height: "",
            promedio: "",
            life_span: "",
            temperament: [],
            url_image: "",
        })
        history.push("/home")
        /*   console.log("submit",input.temperament.toString()) */
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);


    /*  const raza = document.getElementById("name").value */

    return (
        <div>
            <Nav />
            <div className="divBtnVolver">
                <Link to="/home">
                    <button className="btnForm">Volver!</button>
                </Link>
            </div>
            <div className="fff">
                {/* <h1>Soy el formulario.</h1> */}
                <form onSubmit={(e) => handleSubmit(e)} className="formulario">
                    <div className="divForm">
                        <h4>FORMULARIO</h4>



                        <input
                            type="text"
                            placeholder={errors.name ? errors.name : "Nombre"}
                            id="nombre"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            className={errors.name ? "placeIncorrecto" : ""}
                        /> <br /> {/* Nombre de la raza */}

                        <input
                            type="number"
                            placeholder={errors.weight ? errors.weight : "Peso (Kg)"}
                            id="peso"
                            value={input.promedio}
                            name="weight"
                            onChange={(e) => handleChange(e)}
                            className={errors.weight ? "placeIncorrecto" : ""}
                        /> <br /> {/* Peso de la raza */}

                        <input
                            type="number"
                            placeholder={errors.height ? errors.height : "Altura (Cm)"}
                            id="altura"
                            value={input.height}
                            name="height"
                            onChange={handleChange}
                            className={errors.height ? "placeIncorrecto" : ""}
                        /> <br /> {/* Altura de la raza */}

                        <input
                            type="number"
                            placeholder="Esperanza de vida"
                            id="esperanzaVida"
                            value={input.life_span}
                            name="life_span"
                            onChange={handleChange}
                        /> <br /> {/* Esperanza de vida de la raza */}

                        <input
                            type="text"
                            placeholder="Imagen.jpg"
                            id="img"
                            value={input.url_image}
                            name="url_image"
                            onChange={handleChange}
                        /> <br /> {/* Imagen de la raza */}

                        <select onChange={(e) => handleSelect(e)} className="selectForm" id="selectT">
                            <option >Temperamentos</option>
                            {temperamentos.map((el) => (
                                <option key={el.id} value={el.name}>{el.name}</option>
                            ))}
                        </select> <br />

                        {input.temperament.map(el =>

                            <div className="ordenBtn">
                                {el + " "}
                                <button type="button" className="btnX" onClick={() => handleDelete(el)}>x</button>
                            </div>

                        )}

                        <div>
                            <input type={!(input.name && input.height && input.weight) ? "button" : "submit"} value={!(input.name && input.height) ? "Completar Formulario" : "Enviar Formulario!"} className="btnForm" />
                        </div>

                    </div>
                </form>
                <div className="cardForm">
                    <Card nombre={input.name} pic={input.url_image ? input.url_image : logo} peso={input.weight} temperamento={input.temperament.map(el => el + ", ")} />
                </div>
            </div>
        </div>
    )
}