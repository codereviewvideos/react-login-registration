import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import auth from './authReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
});

export default rootReducer;
