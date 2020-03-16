import axios from 'axios';

import {BASE_URL, TIMEOUT} from '../const';


const createAPI = () =>
  axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

export default createAPI;
