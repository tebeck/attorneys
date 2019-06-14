import { authHeader } from '../_helpers';
import {url_backend} from '../_helpers';

 export const adminServices = {
    enableSeeker
 }


function enableSeeker(email){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(email)
    }

    console.log(email)

    return fetch(`${url_backend}/admins/enable`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        })
}


function handleResponse(response) {
    return response.json().then(data => {
        
        if (!response.ok) {
            if (response.status === 401) {
                return data
            }
            if(response.status === 409){
                return data
            }
            if(response.status === 400){
                return data
            }
            if(response.status === 500){
                return data
            }
        }
        if(response.ok){
           return data
        }
        
    });
}
