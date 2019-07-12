import { authHeader } from '../_helpers';
import {url_backend} from '../_helpers';

export const postulationService = {
  postulate,
  getAll
}

function postulate(appId){
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(appId)
  };

  console.log(requestOptions)
    
  return fetch(`${url_backend}/postulations/create`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}

function getAll(){
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

    
  return fetch(`${url_backend}/postulations/`, requestOptions)
    .then( data => {return data.json().then(text=>text)} )
}
