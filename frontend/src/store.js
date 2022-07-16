import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer,productDetailsReducer, NewReviewReducer,NewProductReducer, DeleteProductReducer } from './reducers/ProductReducers';
import {authReducer} from './reducers/UserReducers'
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer,myOrdersReducer ,orderDetailsReducer} from './reducers/orderReducer';
const reducer=combineReducers({
        products:productReducer,
        productDetails:productDetailsReducer,
        newProduct:NewProductReducer,
        myOrder:myOrdersReducer,
        newOrder:newOrderReducer,
        deleteProduct:DeleteProductReducer,
        auth:authReducer,
        cart:cartReducer,
        newReview:NewReviewReducer,
        orderDetails: orderDetailsReducer
})      

let initialState={
        cart: {
                cartItems: localStorage.getItem('cartItems')
                    ? JSON.parse(localStorage.getItem('cartItems'))
                    : [],
                shippingInfo:localStorage.getItem('shippingInfo')
                ? JSON.parse(localStorage.getItem('shippingInfo'))
                : {}
        }
}

const middleware=[thunk];
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;