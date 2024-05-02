import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://localhost:7200/api/',
});

const useAxiosSecure = () => {
    return [axiosSecure];
};

export default useAxiosSecure;