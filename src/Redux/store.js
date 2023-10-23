import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {reducer as ProductReducer} from "./ProductReducer/reducer";
const reducer = combineReducers({ProductReducer})

const store = legacy_createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));
;
export {store};