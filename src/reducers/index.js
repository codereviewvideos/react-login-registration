import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import auth from './authReducer';
import request from './requestReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  request,
});

export default rootReducer;
