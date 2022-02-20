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
        const getRazaInfo = await axios.get("http://localhost:3001/dogs")

        return dispatch({ type: "GET_RAZA", payload: getRazaInfo.data });
    };
}

/* export function getMovieDetail(id) {
    return function (dispatch) {
        return fetch(`http://www.omdbapi.com/?i=${id}&apikey=d1dcdf9c`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: "GET_MOVIE_DETAIL", payload: json });
            });
    };
}
 */