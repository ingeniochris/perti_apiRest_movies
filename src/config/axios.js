import axios from 'axios';

const clienteAxios = axios.create({
    //URL Microservicios - variable global se encuentra en archivo .env
    baseURL: 'http://www.omdbapi.com/?t='

});

export default clienteAxios;
