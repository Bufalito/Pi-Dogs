const axios = require("axios")

/* export function addRaza(payload) {
    return { type: "ADD_RAZA", payload };
}
 */
/* export function removeRaza(raza) {
    return {
        type: "REMOVE_RAZA",
        payload: raza
    };
} */

export function getRazaInfo() {
    return async function (dispatch) {
        const getRazaInfo = await axios("http://localhost:3001/dogs")

        return dispatch({ type: "GET_RAZA", payload: getRazaInfo.data });
    };
}

export function getDetalleRaza(id) {
    return async function (dispatch) {
        const getDetalleRaza = await axios(`http://localhost:3001/dogs/${id}`)

        return dispatch({
            type: "GET_DETALLE_RAZA",
            payload: getDetalleRaza.data
        })
    };
}
export function getTemperaments() {
    return async function (dispatch) {
        const getRazaInfo = await axios("http://localhost:3001/temperament")

        return dispatch({ type: "GET_TEMPERAMENTS", payload: getRazaInfo.data });
    };
}


export function filtroRazasPorTemperamento(payload) {  //payload = e.target.value
    console.log(payload)
    return {
        type: "FILTRO_POR_TEMPERAMENTO",
        payload
    }

}
