import { authHeader } from '../_helpers';
import axios from 'axios'
import {url_backend} from '../_helpers';

export const appearanceService = {
    create,
    subscribe,
    unsubscribe,
    update,
    _delete,
    deleteFile,
    getAgendaTab,
    getAppearancesTab,
    getRequestsTab,
    getAppDetail,
    upload,
    acceptAppearing,
    rejectAppearing,
    completeAppearance,
    finishAppearance,
    getAppearanceByCourt
}




function create(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

  return fetch(`${url_backend}/appearances/create`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}

function subscribe(appId){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(appId)
  };

    
  return fetch(`${url_backend}/appearances/subscribe`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}

function unsubscribe(appId){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(appId)
  };


    
  return fetch(`${url_backend}/appearances/unsubscribe`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}
  
function update(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
      };

    return fetch(`${url_backend}/appearances/update`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )
}

function _delete(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    

    return fetch(`${url_backend}/appearances/delete`, requestOptions)
       .then( data => {return data.json().then(text=>text)} )   
}

function deleteFile(etag){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(etag)
  };

  
    
  return fetch(`${url_backend}/appearances/deleteFile`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}

 /******************* Tabs methods *******************/

 function getAgendaTab() {
     const requestOptions = {
         method: 'POST',
         headers: authHeader()
     };
     return fetch(`${url_backend}/appearances/getagendatab`, requestOptions)
         .then(data => { return data.json() });
 }
 
 function getRequestsTab() {
     const requestOptions = {
         method: 'POST',
         headers: authHeader()
     };
     return fetch(`${url_backend}/appearances/getrequeststab`, requestOptions)
         .then(data => { return data.json() });
 }
 
 function getAppearancesTab() {
     const requestOptions = {
         method: 'POST',
         headers: authHeader()
     };
     return fetch(`${url_backend}/appearances/getappearancestab`, requestOptions)
         .then(data => { return data.json() });
 }
 /****************************************************/

 function upload(image){
    return axios.post(`${url_backend}/files/upload`, image, {headers: authHeader()})
        .then(data => {
          return data
        })
 }

function getAppDetail(appId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(appId)
    };

    return fetch(`${url_backend}/appearances/getappdetail`, requestOptions)
        .then( data => {return data.json()} )
}

function acceptAppearing(appId){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(appId)
  };
    
  return fetch(`${url_backend}/appearances/acceptappearing`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}

function rejectAppearing(appId){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(appId)
  };
    
  return fetch(`${url_backend}/appearances/rejectappearing`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}


function completeAppearance(appId){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(appId)
  };
    
  return fetch(`${url_backend}/appearances/completeappearance`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}

function finishAppearance(appId){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(appId)
  };
    console.log('en el servicio')
  return fetch(`${url_backend}/appearances/finishappearance`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}


 function getAppearanceByCourt(data) {
     const requestOptions = {
         method: 'POST',
         headers: authHeader(),
         body: JSON.stringify(data)
     };
     return fetch(`${url_backend}/appearances/getbycourt`, requestOptions)
         .then( data => {return data.json().then(text=>text)} )
 }


