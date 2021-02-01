import { authHeader } from '../_helpers';
import {url_backend} from '../_helpers';

export const stripeService = {
    getStripeInfo,
    createNewCreditCard,
    createCharge,
    retriveCustomer,
    setDefaultCard
}

function getStripeInfo(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${url_backend}/stripe/getstripeinfo`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )
}


function createNewCreditCard(token){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(token)
    };

    return fetch(`${url_backend}/stripe/createnewcreditcard`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )
}

function setDefaultCard(card){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(card)
    };

    return fetch(`${url_backend}/stripe/setdefaultcard`, requestOptions)
        .then( data => {return data.json().then(text=>text)} )
}

function retriveCustomer(customer){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(customer)
    };
    console.log("customer")
    return fetch(`${url_backend}/stripe/retrivecustomer`, requestOptions)
        .then( data => {return data.json().then(text=>text.customer)} )
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

