import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {reducer as ProductReducer} from "./ProductReducer/reducer";
import  {reducer as AuthReducer} from "./AuthReducer/reducer";
import {reducer as UserDataReducer} from "./UserDataReducer/reducer";
import {reducer as CartReducer} from "./CartReducer/reducer";
import {reducer as OrderReducer} from "./OrderReducer/reducer";
import {reducer as ReviewReducer} from "./ReviewReducer/reducer";

const reducer = combineReducers({ProductReducer,AuthReducer,UserDataReducer,CartReducer,OrderReducer,ReviewReducer})

const store = legacy_createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export {store};