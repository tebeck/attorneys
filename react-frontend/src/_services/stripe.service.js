import { authHeader } from '../_helpers';
import {url_backend} from '../_helpers';

export const stripeService = {
    getStripeInfo,
    storeToken
}

function getStripeInfo(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    console.log("llego")

    return fetch(`${url_backend}/stripe/getstripeinfo`, requestOptions)
        .then(data => {
            console.log(data)
        })
}


function storeToken(token){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(token)
    };
    console.log("llego")

    return fetch(`${url_backend}/stripe/storestripetoken`, requestOptions)
        .then(data => {
            console.log(data)
        })
}

function createCharge(appId){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(appId)
    };
    console.log("llego")

    return fetch(`${url_backend}/stripe/createcharge`, requestOptions)
        .then(data => {
            console.log(data)
        })
}

