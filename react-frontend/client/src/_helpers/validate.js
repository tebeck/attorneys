import Cookies from 'js-cookie';
// import axios from 'axios';
import {url_backend} from '../config.json';
// import { authHeader } from '.';


   export function isValid() {

    let token = Cookies.get('token');

    const requestOptions = {
        method: 'POST',
        headers: {"x-access-token": token, 'Content-Type': 'application/json'}
    };

    return fetch(`${url_backend}/users/isvalid`, requestOptions)
    .then(handleResponse)
    .then(data => {
        if(data.status === 400){
        	Cookies.remove('token')
	        Cookies.remove('user')
			Cookies.remove('email')
            Cookies.remove('attorney')
            Cookies.remove('seeker')
			alert("Invalid/Expired credentials")
			window.location.assign('/')
        }
    })
}


function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                // window.location.reload(true);
            }
            if(response.status === 409){
                // window.location.reload(true);
            }
        }

        // const data = text && JSON.parse(text);
        return data
    });
}