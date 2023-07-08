import { login } from '../services/auth.service'
import { getUser } from '../services/user.service'
import { userLoaded, userRemoved } from './authSlice';

export const userLoggedIn = () => async dispatch => {
  console.log("DISPATCH 401")
  const { data } = await getUser()
  console.log(data)
  dispatch(userLoaded(data));
//   localStorage.setItem('token', data.token);
};


export const getLoggedInUser = () => async dispatch => {
    const { data } = await getUser() ?? {data: null}
    dispatch(userLoaded(data));
};

export const userUnauthorized = () => async dispatch => {
    dispatch(userRemoved({data: null}));
};