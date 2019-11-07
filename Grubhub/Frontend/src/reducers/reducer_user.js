import {
  LOGIN_USER,
  GET_PROFILE,
  UPDATE_PROFILE,
  GET_SEARCH,
  GET_CART,
  ADD_CART,
  GET_USER_PAST_ORDERS,
  USER_ORDER,
  GET_RESTAURANT_DETAILS
} from '../actions'

export default function (state, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload
    case UPDATE_PROFILE:
      return action.payload
    case LOGIN_USER:
      return action.payload
    case GET_SEARCH:
      return action.payload
    case GET_CART:
      return action.payload
    case ADD_CART:
      return action.payload
    case GET_USER_PAST_ORDERS:
      return action.payload
    case   USER_ORDER:
      return action.payload
    case GET_RESTAURANT_DETAILS:
      return action.payload
    default:
      return { ...state }
  }
}
