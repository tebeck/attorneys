import { authHeader } from '../_helpers';
import {url_backend} from '../_helpers';

 export const adminServices = {
    enableSeeker,
    login,
    getUsers,
    rejectSeeker
 }



  function login(data){

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

     return fetch(`${url_backend}/admins/authenticate`, requestOptions)
        .then(handleResponse)
        .then(data => {
           return data
        });
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

function rejectSeeker(email){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(email)
    }

    console.log(email)

    return fetch(`${url_backend}/admins/reject`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function getUsers(){

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    }

    return fetch(`${url_backend}/admins/getusers`, requestOptions)
    .then(handleResponse)
    .then(data => {
        return data
    })
}


function handleResponse(response) {
    return response.json().then(data => {return data });
}
