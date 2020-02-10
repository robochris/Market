import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./Reducer";

export default createStore(rootReducer, applyMiddleware(thunk));
