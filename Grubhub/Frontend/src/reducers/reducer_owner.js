import {
  GET_OWNER_PROFILE,
  ADD_ITEM,
  DELETE_ITEM,
  GET_RESTAURANT_SECTIONS,
  GET_ITEMS_BASED_ON_SECTIONS,
  EDIT_ITEM,
  PAST_ORDERS,
  NEW_ORDERS,
  PREPARING_ORDER_STATUS,
  DELIVERING_ORDER_STATUS
} from '../actions'

export default function (state, action) {
  switch (action.type) {
    case GET_OWNER_PROFILE:
      return action.payload
    case ADD_ITEM:
      return action.payload
    case DELETE_ITEM:
      return action.payload
    case GET_RESTAURANT_SECTIONS:
      return action.payload
    case GET_ITEMS_BASED_ON_SECTIONS:
      return action.payload
    case EDIT_ITEM:
      return action.payload
    case PAST_ORDERS:
      return action.payload
    case NEW_ORDERS:
        return action.payload
    case PREPARING_ORDER_STATUS:
      return action.payload 
    case DELIVERING_ORDER_STATUS:
      return action.payload
      
    default:
      return { ...state }
  }
}
