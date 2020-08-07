import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "./reducers/auth";
import { accessReducer } from "./reducers/access";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/user";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    access: accessReducer,
    auth: authReducer,
    user: userReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
