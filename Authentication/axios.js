import axios from 'axios';

const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_IS_DEVELOPMENT;
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_URL;
let baseURL = '';





if (IS_DEVELOPMENT === 'True') {
   baseURL = 'http://127.0.0.1:8000'
} else {
    baseURL = 'https://api.famousbusiness.in'
};






const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        // Authorization: localStorage.getItem('accessToken')
        //     ? 'Bearer ' + localStorage.getItem('accessToken')
        //     : null,
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
});


axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;

}, (error)=> {
    return Promise.reject(error);

})


// If the user is Unauthorize then redirect to Signin page
axiosInstance.interceptors.response.use(
    (res) => {
        return res
    },

    async function (error) {
        // const originalRequest = error.config;

        if (error.response) {
            if (error.response.statusText === 'Unauthorized') {
                window.location.href = '/login/';
            }
            return Promise.reject(error);
        } else {
            // console.error('Network Error or other issue:', error);
            return Promise.reject(error);
        }
    }
);



export default axiosInstance;

