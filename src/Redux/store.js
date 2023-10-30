import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {reducer as ProductReducer} from "./ProductReducer/reducer";
import  {reducer as AuthReducer} from "./AuthReducer/reducer";
import {reducer as UserDataReducer} from "./UserDataReducer/reducer";
import {reducer as CartReducer} from "./CartReducer/reducer"
const reducer = combineReducers({ProductReducer,AuthReducer,UserDataReducer,CartReducer})

const store = legacy_createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export {store};