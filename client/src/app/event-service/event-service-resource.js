import axios from 'axios';

const basePath = '/api';
const promisify = callback => new Promise((resolve, reject) => {
    callback().then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error.data);
    });
});

export const addEvent = task => promisify(() => axios.post(`${basePath}/task`, task));

export const updateEvent = task => promisify(() => axios.put(`${basePath}/task`, task));

export const deleteEvent = id => promisify(() => axios.delete(`${basePath}/task`, { params: { id } }));

export const getEvents = () => promisify(() => axios.get(`${basePath}/tasks`));
