import axios from 'axios';
export const LOGIN_USER = "login_user";
export const GET_PROFILE ="get_profile";
export const GET_OWNER_PROFILE ="get_owner_profile";
export const UPDATE_PROFILE ="update_profile";
export const ADD_ITEM ="add_item";
export const GET_SEARCH ="get_search";
export const ADD_CART ="add_cart";
export const GET_CART ="get_cart";
export const GET_USER_PAST_ORDERS="get_user_past_order";
export const USER_ORDER="user_order";
export const GET_RESTAURANT_DETAILS="get_restaurant_details";
export const GET_RESTAURANT_CUISINE = "get_restaurant_cuisine";
export const DELETE_ITEM = "delete_item";
export const GET_RESTAURANT_SECTIONS = "get_restaurant_sections";
export const GET_ITEMS_BASED_ON_SECTIONS = "get_items_based_on_sections";
export const EDIT_ITEM ="edit_item";
export const PAST_ORDERS="past_order";
export const NEW_ORDERS="new_order";
export const PREPARING_ORDER_STATUS="Preparing_order_status";
export const DELIVERING_ORDER_STATUS="Delivering_order_status";


const ROOT_URL = "http://localhost:3001";

export function loginuser(values,callback) {

    axios.defaults.withCredentials=true;
    console.log(values);
    const request = axios
    .post(`${ROOT_URL}/login`,values);

    return (dispatch) =>{
        request.then((res)=>{
            
            dispatch({ 
                type: LOGIN_USER,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function getProfile(values, callback) {

    axios.defaults.withCredentials=true;
    console.log(values)
    const request = axios
    .post(`${ROOT_URL}/profile/getprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getOwnerProfile(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/profile/getprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_OWNER_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function updateProfile(values, callback) {

    axios.defaults.withCredentials=true;
    console.log("Redux CALLED"+values)
    const request = axios
    .post(`${ROOT_URL}/profile/updateprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function additem(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurant/additem`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function search(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurant/restaurantsbyItemName`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_SEARCH,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function addcart(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/cart/addToCart`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: ADD_CART,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function cart(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/cart/showCart`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_CART,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function pastorder(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/orders/previousOrders`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_USER_PAST_ORDERS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function order(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/orders/upcomingOrders`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: USER_ORDER,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function vRestaurant(values, callback) {

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurant/itemsByRestaurant`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_RESTAURANT_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function cRestaurant(values, callback) {
    console.log('Cuisine Action called')
    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurant/restaurantsbyItemCuisine`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_RESTAURANT_CUISINE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function deleteitem(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .put(`${ROOT_URL}/restaurant/deleteitem`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: DELETE_ITEM,
                payload: res.data
            });
            callback(res);
        })
    }
    
}



export function getsections(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurant/allsections`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_RESTAURANT_SECTIONS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getibosections(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurant/itemsbasedonsections`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: GET_ITEMS_BASED_ON_SECTIONS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function edititem(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurant/updateitem`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: EDIT_ITEM,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function opastorders(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/orders/all-orders`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: PAST_ORDERS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function oneworder(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/orders/all-orders`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: NEW_ORDERS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function porder(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .put(`${ROOT_URL}/orders/manage-orders`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type:   PREPARING_ORDER_STATUS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function dorder(values, callback) {
    axios.defaults.withCredentials=true;

    const request = axios
    .put(`${ROOT_URL}/orders/manage-orders`,values);

    return (dispatch) =>{
        request.then((res)=>{
            dispatch({
                type: DELIVERING_ORDER_STATUS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}
