import { authHeader } from '../_helpers';
import Cookies from 'js-cookie';
import {url_backend} from '../config.json';

export const userServices = {
    authenticate,
    register
}

function register(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${url_backend}/users/register`, requestOptions)
    // .then(handleResponse)
    .then(data => {
        return data;
    })
}

function authenticate(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
     return fetch(`${url_backend}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(data => {
                Cookies.set('token', data.token)
                Cookies.set('user',data.result.firstName, { expires: 1 })
                Cookies.set('email',data.result.email, { expires: 1 })
                if(data.result.isAttorney){
                    Cookies.set('attorney', data.result.isAttorney)    
                }
                if(data.result.isSeeker){
                    Cookies.set('seeker', data.result.isSeeker)    
                }

            return data;
        });
}



// function logout() {
//     Cookies.remove('token')
//     Cookies.remove('user')
//     Cookies.remove('email')
// }

// function attempts(){

//}



function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                return window.location.reload(true);
            }
            if(response.status === 409){
                return window.location.reload(true);
            }
        }

        return data
    });
}
