import { authHeader } from '../_helpers';
import axios from 'axios'
import Cookies from 'js-cookie';
import {url_backend} from '../_helpers';

export const appearanceService = {
    appearances,
    getSpecific,
    create,
    _delete,
    updateSpecific,
    upload,
    getSpecificById,
    getAppearances,
    expire
}

function expire(){
    Cookies.remove('esquired')
    alert("Invalid/Expired credentials")
    window.location.assign('/')
}


function appearances(pageNo) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${url_backend}/appearances?pageNo=${pageNo}&size=15`, requestOptions)
        .then(data=>{
            return data.json()
        });
}

function getAppearances() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${url_backend}/appearances`, requestOptions)
        .then(data=>{
            return data.json()
        });
}

function getSpecificById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };


    return fetch(`${url_backend}/products/id/${id}`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )
}

// Getting by title or category.
function getSpecific(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    const title = data.title;

    return fetch(`${url_backend}/products/${title}?&size=50`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )

}


function upload(image){
    return axios.post(`${url_backend}/files/upload`, image, {headers: authHeader()})
        .then(data => {return data})
}

function create(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };


  return fetch(`${url_backend}/appearances/create`, requestOptions)
        // .then( data => {return data.json().then(text=>text)} )
        .then(data => console.log(data))
}    


// "delete" is a reserved word. so... _delete.
function _delete(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${url_backend}/appearances/delete`, requestOptions)
       .then( data => {return data.json().then(text=>text)} )

    

}

function updateSpecific(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    const id = data.id;

    return fetch(`${url_backend}/products/update/${id}`, requestOptions)
    .then(data => {
        console.log(data)
        // window.location.assign('/')
    })
}

