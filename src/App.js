import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from './store/ui-slice';


import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import {fetchCartData} from './store/cart-function';

let initialRender = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const notification= useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);

  useEffect(()=>{
     dispatch(fetchCartData());
  },[dispatch])
  
  useEffect(()=>{
    const saveCart = async ()=>{
    
      dispatch(uiActions.showNotification({
        status:'pending',
        title: 'Sending Request...',
        message:'Saving book data!'
      }) );

     const response= await fetch('https://food-app-70365-default-rtdb.firebaseio.com/bookCart.json',{
        method:'PUT',
        body:JSON.stringify(cart)
      });

      if(!response.ok){
         throw new Error('Request Failed');
      } 

      const data = await response.json();
      dispatch(uiActions.showNotification({
        status:'success',
        title: 'Successfully saved',
        message:'Cart saved successfully'
      }) );
    }

    if(initialRender){
       initialRender = false;
       return;
    }

    saveCart().catch((error)=>{
      dispatch(uiActions.showNotification({
        status:'error',
        title: 'Error!',
        message:'Cart save failed'
      }) );
    })
   
  },[cart])

  return (
    <Fragment>
     {notification && 
       <Notification status={notification.status}
                  title={notification.title} 
                   message={notification.message} /> 
     } 
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
