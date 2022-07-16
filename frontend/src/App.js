
import Header from './Components/Layout/Header';
import './App.css'
import Footer from './Components/Layout/Footer';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import {loadUser} from './action/userAction'
import store from './store'
import { useEffect ,useState } from 'react';
import Profile from './Components/User/Profile';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Components/Cart/Payment';
import {loadStripe} from '@stripe/stripe-js'
import DashBoard from './Components/Admin/DashBoard';
import ProductsList from './Components/Admin/ProductList';
import NewProduct from './Components/Admin/NewProduct';
import OrderSuccess from './Components/Cart/OrderSuccess';
import ListOrders from './Components/order/ListOrder';
import OrderDetails from './Components/order/OrderDetails';
function App() {

  const [stripeApiKey,SetstripeApiKey]=useState('')
  useEffect(()=>{
    store.dispatch(loadUser())
    async function getStripeApiKey(){
      const {data}=await axios.get('/api/v1/stripeapi')
      SetstripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey();
    
  },[])
 
  return (
    <Router>
    <div className="App"> 
     <Header></Header>
     <div className='container container-fluid'>
       <Routes>
       <Route path='/' element={<Home></Home>} exact></Route>
       <Route path='/search/:keyword' element={<Home></Home>} ></Route>
       <Route path='/product/:id' element={<ProductDetails></ProductDetails>} exact></Route>
       <Route path='/cart' element={<Cart></Cart>} exact></Route>
       <Route path='/login' element={<Login></Login>} exact></Route>
       <Route path='/order/confirm' element={<ConfirmOrder></ConfirmOrder>} exact></Route>
       <Route path='/shipping' element={<Shipping></Shipping>} exact></Route>
       <Route path='/register' element={<Register></Register>} exact></Route>
       <Route path='/me' element={<Profile></Profile>} exact></Route>
      <Route path='/success' element={<OrderSuccess></OrderSuccess>}></Route>
      <Route path='/orders/me' element={<ListOrders></ListOrders>}></Route>
      <Route path='/order/:id' element={<OrderDetails></OrderDetails>}></Route>
      {console.log(stripeApiKey)}
       </Routes>
       {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
              <Route path="/payment" element={<Payment></Payment>} />
              </Routes>
            </Elements>
          }
      </div>
      <Routes>
      <Route path='/dashboard' element={<DashBoard></DashBoard>}></Route>
      <Route path='/admin/products' element={<ProductsList></ProductsList>}></Route>
      <Route path='/admin/product' element={<NewProduct></NewProduct>}></Route>
      </Routes>
     <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
