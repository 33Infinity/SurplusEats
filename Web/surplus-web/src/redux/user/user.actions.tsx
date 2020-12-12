import UserActionTypes from './user.types';
import ProfileModel from '../../Models/ProfileModel';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const authenticateCurrentUserAsync = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(setCurrentUser(new ProfileModel("","","","Aaron","Flores","",true)))            
        }, 7000)
    }
}