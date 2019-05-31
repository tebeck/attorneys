import { authHeader } from '../_helpers';
import Cookies from 'js-cookie';
import {url_backend} from '../config.json';

export const userServices = {
    authenticate,
    register,
    recoverPassword,
    changePassword,
    getProfile,
    sendmail
}

function register(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${url_backend}/users/register`, requestOptions)
    .then(handleResponse)
    .then(data => {
        return data;
    })
}


function getProfile(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${url_backend}/users/profile`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
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
            if(data.result && data.token){
                if(data.result.isAttorney){
                  Cookies.set('esquired', {token: data.token, user: data.result.firstName, email: data.result.email, isAttorney: data.result.isAttorney}, { path: '' })   
                }
                if(data.result.isSeeker){
                  Cookies.set('esquired', {token: data.token, user: data.result.firstName, email: data.result.email, isSeeker: data.result.isSeeker}, { path: '' })
                }
                if(data.result.isAttorney && data.result.isAttorney){
                  Cookies.set('esquired', {token: data.token, user: data.result.firstName, email: data.result.email, isAttorney: data.result.isAttorney, isSeeker: data.result.isSeeker}, { path: '' })   
                }
             return window.location.assign('/');
            }
        });
  }


function recoverPassword(email){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(email)
    };

    return fetch(`${url_backend}/users/recoverpassword`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data)
        })
}

  function changePassword(data){
      const requestOptions = {
          method: 'POST',
          headers: authHeader(),
      };

    return fetch(`${url_backend}/users/changepassword/${JSON.stringify(data)}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            if(data && data.message){
                return data.message
            } else {
                return data
            }
            
        }) 

  }

  function sendmail(data){
     const requestOptions = {
         method: 'POST',
         headers: authHeader(),
         body: JSON.stringify(data)
     };

     console.log(JSON.stringify(data))

     return fetch(`${url_backend}/users/sendmail`, requestOptions)
         .then( data => {data.json().then(text=>console.log( text) )} ) 

  }


function handleResponse(response) {
    return response.json().then(data => {
        
        if (!response.ok) {
            if (response.status === 401) {
                return data.message
            }
            if(response.status === 409){
                return data.message
            }
            if(response.status === 400){
                return data.message
            }
        }
        if(response.ok){
           return data
        }
        
    });
}
