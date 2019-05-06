import { authHeader } from '../_helpers';
import {url_backend} from '../config.json';
import axios from 'axios'
import {isValid} from '../_helpers';

export const productService = {
    products,
    getSpecific,
    add,
    _delete,
    updateSpecific,
    upload,
    getSpecificById
}


function products(pageNo) {
    isValid()
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${url_backend}/products?pageNo=${pageNo}&size=15`, requestOptions)
        .then(data=>{
            return data.json()
        });
}

function getSpecificById(id){
    isValid()
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };


    return fetch(`${url_backend}/products/id/${id}`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )
}

// Getting by title or category.
function getSpecific(data) {
    isValid()
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    const title = data.title;

    return fetch(`${url_backend}/products/${title}?&size=50`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )

}


function upload(image){
    isValid()
    return axios.post(`${url_backend}/files/upload`, image, {headers: authHeader()})
        .then(data => {return data})
}

function add(data){
    isValid()
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };


    return fetch(`${url_backend}/products/add`, requestOptions)
        .then(data => {
            return data.json()
            // window.location.assign('/')
            // return data.json()
        })

}

// "delete" is a reserved word. so... _delete.
function _delete(data){
    isValid()
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    const id = data.id;

    return fetch(`${url_backend}/products/delete/${id}`, requestOptions)
    .then(data =>{
        console.log("Product deleted")
        return data.json()
    })

}

function updateSpecific(data){
    isValid()
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

