import axios from 'axios';

export const BASE_URL =
    import.meta.env.VITE_ENV === 'development'
        ? import.meta.env.VITE_APP_DEV_URL
        : import.meta.env.VITE_APP_PROD_URL;
console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_ENV);
const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    validateStatus: (status: number) => status < 500
});

const postData = async (url: string, payload: any) => {
    try {
        const response = await request.post(url, payload);
        if (response.status >= 400) {
            throw new Error(
                response.data?.message || 'An unknown error occurred'
            );
        }
        return response.data; // Return the data on success
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error
    }
};

const putData = async (url: string, payload: any) => {
    try {
        const response = await request.put(url, payload);
        if (response.status >= 400) {
            throw new Error(
                response.data?.message || 'An unknown error occurred'
            );
        }
        return response.data; // Return the data on success
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error
    }
};

const getData = async (url: string) => {
    try {
        const response = await request.get(url);
        if (response.status >= 400) {
            throw new Error(
                response.data?.message || 'An unknown error occurred'
            );
        }
        return response.data; // Return the data on success
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error
    }
};

const getDataBlob = async (url: string, blob: any) => {
    try {
        const response = await request.get(url, blob);
        if (response.status >= 400) {
            throw new Error(
                response.data?.message || 'An unknown error occurred'
            );
        }
        return response.data; // Return the data on success
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error
    }
};

const deleteData = async (url: string) => {
    try {
        const response = await request.delete(url);
        if (response.status >= 400) {
            throw new Error(
                response.data?.message || 'An unknown error occurred'
            );
        }
        return response.data; // Return the data on success
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error
    }
};

export { request, postData, putData, getData, getDataBlob, deleteData };
