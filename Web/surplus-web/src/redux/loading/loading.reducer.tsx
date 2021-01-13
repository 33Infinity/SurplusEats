import LoadingTypes from "./loading.types";

const INITIAL_LOADING = {
    isLoading: false
}

const loadingReducer = (state = INITIAL_LOADING, action) => {
    switch (action.type) {
        case LoadingTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };       
        default:
            return state;
    }
}

export default loadingReducer;