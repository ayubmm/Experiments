import {createStore, combineReducers} from 'redux';
import userReducer from '../reducers/user';
import productReducer from '../reducers/product';

const reducers = combineReducers({userReducer, productReducer});

const store = createStore(reducers);

export default store;
