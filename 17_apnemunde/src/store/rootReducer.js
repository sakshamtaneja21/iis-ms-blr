const initialState = {
  orderDetails:{
    live_url:"https://www.amazon.com/mobiles/iphon11maxpro",
    image_url: "https://images-na.ssl-images-amazon.com/images/I/715oBmExjoL._AC_SL1500_.jpg",
    currency: "$",
    source: "Amazon",
    quantity: 2,
    price:"1250",
    description:"Smart watch",
    title: "Amazon",
  },
  orderCreatedSuccessfully:null,
  showUserProfile: false,
};

export default function appReducer(state=initialState,action){
  console.log('action ===> ', action);
  switch(action.type){
    case "FETCH_ORDER_DETAILS_SUCCESS":
      return {
        ...state,
        orderDetails: action.data[0],
      };
      break;
    case "URL_EDIT_CHANGE":
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          live_url: action.val
        }
      }
      break;
    case "FETCH_LIST_TRIPS":
      return {
        ...state,
        trips_list: action.data,
      }
    case "FETCH_LIST_ORDERS":
      return {
        ...state,
        orders_list: action.data,
      }
      break;
    case "CREATE_ORDER_SUCCESSFULL":
      return {
        ...state,
        orderCreatedSuccessfully:true
      }
    case "FETCH_TRIP_LIST_ORDERS":
      return {
        ...state,
        orders_list: action.data,
      }
    // dispatch({type:"FETCH_TRIP_LIST_ORDERS",data:res.orders_lst});
    default:
      return state;
  }
}