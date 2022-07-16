import { LOGIN_FAIL,
    LOGIN_REQUEST,
     LOGIN_SUCCESS,REGISTER_REQUEST,
     REGISTER_FAIL,
     REGISTER_SUCCESS,
     LOAD_REQUEST,
     LOAD_FAIL,
     LOAD_SUCCESS,
     LOGOUT_FAIL,
     LOGOUT_SUCCESS,
     LOGOUT_REQUEST,
     CLEAR_ERRORS} from "../constants/userConstant";
import axios from "axios";
export const login=(email,password)=>async(dispatch)=>{
try{
    dispatch({
        type:LOGIN_REQUEST
    })
    
    const config={
        headers:{
            'Content-Type':'application/json',
        },
        withCredentials: true
    }
    const {data}=await axios.post('/api/v1/login',{email,password},config)
    console.log(data)
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
        type:LOGIN_SUCCESS,
        payload:data.user
    })
}
catch(error){
    dispatch({
        type:LOGIN_FAIL,
        payload:error.response.data.message
    })
}
}
export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch({
            type:REGISTER_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data}=await axios.post('/api/v1/register',userData,config)
        console.log(data)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.message
        })
    }
    }
export const loadUser=()=>async(dispatch)=>{
        try{
            dispatch({
                type:LOAD_REQUEST
            })
           
            const {data}=await axios.get('/api/v1/me')
            console.log(data)
            dispatch({
                type:LOAD_SUCCESS,
                payload:data.user
            })
        }
        catch(error){
            console.log(error)
            dispatch({
                type:LOAD_FAIL,
                payload:error.response.data.message
            })
        }
}
export const logoutUser=()=>async(dispatch)=>{
    try{
        dispatch({
            type:LOGOUT_REQUEST
        })
       
        const {data}=await axios.get('/api/v1/logout')
        console.log(data)
        dispatch({
            type:LOGOUT_SUCCESS,
         
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        })
    }
}
export const clearErrors=() => async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}