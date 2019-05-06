import Cookies from 'js-cookie';
import axios from 'axios';

export function authHeader() {
    // return authorization header with jwt token
    let token = Cookies.get('token');

    if (token) {
        return {"x-access-token": token, 'Content-Type': 'application/json'};
    } else {
        return {"Content-Type": "application/json"};
    }
}