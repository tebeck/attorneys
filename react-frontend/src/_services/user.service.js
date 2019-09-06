import { authHeader } from '../_helpers';
import Cookies from 'js-cookie';
import axios from 'axios';
import {url_backend} from '../_helpers';

export const userServices = {
    authenticate,
    register,
    recoverPassword,
    changePassword,
    getProfile,
    sendmail,
    makeSeeker,
    getSeekerAuth,
    upload,
    updateAccountInfo,
    updateProfInfo,
    makeAttorney,
    multiupload,
    rateAttorney,
    rateSeeker,
    getUserProfile,
    notificationRead,
    ratingAverage
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
      if(data.user && data.token){
        data.status=200;
          if(data.user.isAttorney && data.user.isSeeker){
            Cookies.set('esquired', {token: data.token, user: data.user.firstName, email: data.user.email, isAttorney: data.user.isAttorney, isSeeker: data.user.isSeeker,onHold: true, userId: data.user._id}, { path: '' })   
          } else
          if(data.user.isAttorney){
            Cookies.set('esquired', {token: data.token, user: data.user.firstName, email: data.user.email, isAttorney: data.user.isAttorney, onHold: true, userId: data.user._id}, { path: '' })   
          }
       return data;
      } else{
          data.status = 400
          return data
            }
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
            if(data.status === 200){
                
                if(data.result.isAttorney && data.result.isSeeker){
                  Cookies.set('esquired', {token: data.token, user: data.result.firstName, email: data.result.email, isAttorney: data.result.isAttorney, isSeeker: data.result.isSeeker,onHold: data.result.onHold, userId: data.result._id}, { path: '' })   
                } else 
                if(data.result.isAttorney){
                  Cookies.set('esquired', {token: data.token,user: data.result.firstName,email: data.result.email,isAttorney: data.result.isAttorney,onHold: data.result.onHold,userId: data.result._id}, { path: '' })   
                } else 
                if(data.result.isSeeker){
                  Cookies.set('esquired', {token: data.token, user: data.result.firstName, email: data.result.email, isSeeker: data.result.isSeeker, userId: data.result._id}, { path: '' })
                }
            }
          return data
            
        });
  }

function upload(image){
    return axios.post(`${url_backend}/files/upload`, image, {headers: authHeader()})
        .then(data => {return data})
}

function multiupload(images){
    return axios.post(`${url_backend}/files/multiupload`, images , {headers: authHeader()})
        .then(data => {
          return data
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

function getUserProfile(body){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }

    return fetch(`${url_backend}/users/getuserprofile`, requestOptions)
        .then(handleResponse)
        .then(data => { return data.data })
}

function makeAttorney(userId){
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(userId)
    }

    return fetch(`${url_backend}/users/makeattorney`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function notificationRead(){
      const requestOptions = {
        method: 'POST',
        headers: authHeader()
    }
    console.log("entra")
    return fetch(`${url_backend}/users/notificationread`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function rateAttorney(body){
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }

    return fetch(`${url_backend}/users/rateattorney`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function rateSeeker(body){
      const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }

    return fetch(`${url_backend}/users/rateseeker`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

function makeSeeker(userId){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(userId)
    }

    return fetch(`${url_backend}/users/makeseeker`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        })
}

  function getSeekerAuth(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${url_backend}/users/getseekerauth`, requestOptions)
        .then(handleResponse)
        .then(data => {
          if(data.result && data.token){
           return data
          }
          else{
           return data
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
            return data
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


  function updateAccountInfo(data){
          const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(data)
      };

    return fetch(`${url_backend}/users/updateaccountinfo`, requestOptions)
        .then(handleResponse)
        .then(data => {
            if(data && data.message){
                return data.message
            } else {
                return data
            }
            
        }) 
  }

  function updateProfInfo(data){
          const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(data)
      };

    return fetch(`${url_backend}/users/updateprofinfo`, requestOptions)
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
     return fetch(`${url_backend}/users/sendmail`, requestOptions)
         .then( data => {data.json().then(text=>console.log( text) )} ) 
  }



  function ratingAverage(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${url_backend}/users/ratingaverage`, requestOptions)
        .then(handleResponse)
        .then(data => { return data })
}


function handleResponse(response) {
    return response.json().then(data => { return data });
}
