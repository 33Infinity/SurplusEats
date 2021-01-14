import LoadingTypes from "./loading.types";

export const setLoading = (isLoading) => ({
    type: LoadingTypes.SET_LOADING,
    payload: isLoading
});

