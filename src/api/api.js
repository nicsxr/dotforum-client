import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../store';
import { userUnauthorized } from '../features/authActions';

// const api = axios.create({
//     baseURL:  "https://localhost:7177/api",
//     withCredentials: true,
// })

// let store
// export const injectStore = _store => {
//     store = _store
// }


axios.interceptors.response.use(
    response => {
        if(response.headers['x-is-authenticated'] == 'False'){
            store.dispatch(userUnauthorized());
        }
        return response
    },
    error => {
      const {status} = error.response;
      if (status === 401) {
        store.dispatch(userUnauthorized());
      }
      return Promise.reject(error);
   }
);

const AxiosInterceptor = ({ children }) => {
    console.log("???????????????????????")
    const [isSet, setIsSet] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {

        const resInterceptor = response => {
            return response;
        }

        const errInterceptor = async (error) =>{
            if (error.response.status === 401) {
                store.dispatch(userUnauthorized())
                // navigate('/login');
                return
            }

            return Promise.reject(error);
        }


        const interceptor = axios.interceptors.response.use(resInterceptor, errInterceptor);

        setIsSet(true)
        return () => axios.interceptors.response.eject(interceptor);

    }, [navigate])

    return isSet && children;
}


export default axios;
export { AxiosInterceptor }