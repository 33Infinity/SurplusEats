import LoadingTypes from "./loading.types";

const setLoading = (isLoading) => ({
    type: LoadingTypes.SET_LOADING,
    payload: isLoading
});

export default setLoading;