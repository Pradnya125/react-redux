import { uiActions } from "./ui-slice";

export const fetchCartData =()=>{
    return async(dispatch) => {
       const fetchData= async()=>{
         const response = await fetch('https://food-app-70365-default-rtdb.firebaseio.com/bookCart.json');

         if(!response.ok){
              throw new Error('Could not able to fetch cart data');
         }

       //  const data = await response.json();

         return response
       }
      try{
        const cartData = await fetchData();
        console.log(cartData);
        dispatch(uiActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity
        }));
      }catch(error){
        dispatch(uiActions.showNotification({
            status:'error',
            title: 'Error!',
            message:'Cart data fetching failed'
          }) );
      }
       
    }
}