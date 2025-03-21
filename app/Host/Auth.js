import axios from "axios"
import { api } from "./host"
import Cookies from "js-cookie";

    
export const registerFunc=(data)=>{
    return(axios.post( `${api}/users/register/`, data))
}


export const postAdd=(data)=>{
    var token=getToken()
    return(axios.post( `${api}/blog/announcements/`, data, {
        headers:{
            "Authorization":"Token " + token
        }
    }))
}
export const postComment=(data)=>{
    var token=getToken()
    return(axios.post( `${api}/blog/comments/`, data, {
        headers:{
            "Authorization":"Token " + token
        }
    }))
}

export const getToken=()=>{
     return(Cookies.get("token_access_test"))
}