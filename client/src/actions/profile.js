import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR,  CLEAR_PROFILE} from './types';
import {setAlert} from './alert';

//  Get current users profile
export const getCurrentUserProfile = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({type: GET_PROFILE, payload: res.data})
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}