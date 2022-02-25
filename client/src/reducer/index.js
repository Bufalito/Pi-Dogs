const initialState = {
    razaLoaded: [],
    totalRazas: [],
    detalleRaza: [],
    temperamentosRazas: [],

};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RAZA":
            if (!state.razaLoaded.length) {
                return {
                    ...state, razaLoaded: action.payload, totalRazas: action.payload
                }
            } else {
                return {
                    ...state, totalRazas: action.payload
                }
            }
        case "GET_DETALLE_RAZA":
            return {
                ...state, detalleRaza: action.payload
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state, temperamentosRazas: action.payload
            }
        case "FILTRO_POR_TEMPERAMENTO":
            const razasTodas = state.totalRazas;
            const tempFilter = action.payload === "Todas las razas" ? razasTodas : razasTodas.filter(el => {
                if (el.temperaments) {
                    if (el.temperaments.includes(action.payload)) {
                        return el
                    }
                }
            })
            return {
                ...state, razaLoaded: tempFilter
            }
        case "FILTRO_DB_OR_API":
            const dbOrApiFilter = action.payload === "creados" ? state.totalRazas.filter(el => el.createdInDb) : state.totalRazas.filter(el => !el.createdInDb)
            return {
                ...state, razaLoaded: action.payload === "todos" ? state.totalRazas : dbOrApiFilter
            }
        case "ORDEN_POR_NOMBRE":
            const arrSort = action.payload === "ascendete" ?
                state.razaLoaded.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.razaLoaded.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                razaLoaded: arrSort
            }
        default:
            return state;
    }
}

export default rootReducer;