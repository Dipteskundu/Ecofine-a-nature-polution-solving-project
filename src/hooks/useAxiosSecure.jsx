import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase.config';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
});

const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(async function (config) {
            const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
            const email = auth.currentUser ? auth.currentUser.email : null;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            if (email) {
                config.headers['X-User-Email'] = email;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async function (error) {
            const status = error.response ? error.response.status : null;
            if (status === 401 || status === 403) {
                await logout();
                navigate('/login');
            }
            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
    }, [logout, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
