import * as UserConstants from './constants';
import {fetchUser} from './api';

export const fetchUserAction = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.FETCH_USER,
    });
    fetchUser()
      .then((response) => {
        dispatch({
          type: UserConstants.FETCH_USER_SUCCESS,
          payload: response,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.FETCH_USER_ERROR,
        });
        reject(err);
      });
  });
};