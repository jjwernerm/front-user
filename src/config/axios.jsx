import axios from 'axios';

const configAxios = axios.create({

  baseURL:`${import.meta.env.VITE_BACKEND_URL}/user`

});

export default configAxios;