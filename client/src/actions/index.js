const axios = require("axios")


export function getRazaInfo() {
    return async function (dispatch) {
        const getRazaInfo = await axios("/dogs")

        return dispatch({ type: "GET_RAZA", payload: getRazaInfo.data });
    };
}

export function getRazaSearch(name) {
    return async function (dispatch) {
        try {
            const getRazaSearch = await axios(`/dogs?name=${name}`)

            return dispatch({
                type: "GET_RAZA_SEARCH",
                payload: getRazaSearch.data
            })

        } catch (error) {
            console.log(error)
            alert("Raza no existente")
        }

    }
}

export function getDetalleRaza(id) {
    return async function (dispatch) {
        const getDetalleRaza = await axios(`/dogs/${id}`)

        return dispatch({
            type: "GET_DETALLE_RAZA",
            payload: getDetalleRaza.data
        })
    };
}

export function vaciarDetalle() {
    return {
        type: "VACIAR_RAZA",
        payload: []
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        const getRazaInfo = await axios("/temperament")

        return dispatch({ type: "GET_TEMPERAMENTS", payload: getRazaInfo.data });
    };
}

export function filtroRazasPorTemperamento(payload) {  //payload = e.target.value
    /*  console.log(payload) */
    return {
        type: "FILTRO_POR_TEMPERAMENTO",
        payload
    }
}

export function filtroDbOrApi(payload) {
    return {
        type: "FILTRO_DB_OR_API",
        payload
    }
}

export function ordenPorNombre(payload) {
    return {
        type: "ORDEN_POR_NOMBRE",
        payload
    }
}

export function ordenPorPeso(payload) {
    return {
        type: "ORDEN_POR_PESO",
        payload
    }
}

export function postFormulario(payload) {
    console.log(payload)
    return async function () {
        const response = await axios.post("/dog", payload);
        /* console.log(response) */
        return response;
    }
}

