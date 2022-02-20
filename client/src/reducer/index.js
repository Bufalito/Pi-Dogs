const initialState = {
    razaLoaded: [],

};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RAZA":
            return {
                ...state, razaLoaded: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;