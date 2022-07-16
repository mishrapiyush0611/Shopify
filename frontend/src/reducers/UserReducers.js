import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_REQUEST,
    LOAD_FAIL,
    LOAD_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    CLEAR_ERRORS
} from '../constants/userConstant'

export const authReducer=(state={user:{}},action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_REQUEST:
            return{
                loading:true,    
            }
            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            case LOAD_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
            case LOGOUT_SUCCESS:
                return{
                  loading:false,
                  isAuthenticated:false,
                  user:null,
                  
                }
            case LOAD_FAIL:
                return{
                  loading:false,
                  isAuthenticated:false,
                  user:null,
                  error:action.payload  
                }
            case LOGOUT_FAIL:
                return{
                    ...state,
                    error:action.payload
                }
            case REGISTER_FAIL:
            case LOGIN_FAIL:
           
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
        default:
            return{
                ...state
            }
    }
}