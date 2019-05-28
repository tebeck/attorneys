import Cookies from 'js-cookie';
// import axios from 'axios';

export function authHeader() {
    // return authorization header with jwt token
   	let token = false
   	if(Cookies.getJSON('esquired')){ token = Cookies.getJSON('esquired').token }
   		
    if (token) {
        return {"x-access-token": token, 'Content-Type': 'application/json'};
    } else {
        return {"Content-Type": "application/json"};
    }
}