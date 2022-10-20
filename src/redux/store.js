import { combineReducers, applyMiddleware} from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

import {UserReducer} from './reducer';

const rootReducer = combineReducers({
 user: UserReducer,
});

const store = createStore(
 rootReducer,
 applyMiddleware(thunk),
);

export default store;