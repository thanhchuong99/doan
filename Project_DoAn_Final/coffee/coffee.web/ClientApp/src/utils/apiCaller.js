import axios from 'axios';
import * as Config from './../constants/Config';
import authHeader from './../components/auth/authheader';

export default function callApi(endpoint, method = 'POST', body){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: authHeader()
    })
};