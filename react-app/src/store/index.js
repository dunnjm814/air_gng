import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session'
import profileReducer from './profile'
import bizReducer from './aircraft'
import reviewReducer from './review'
import bookingReducer from './booking'
import locationReducer from './location'

const rootReducer = combineReducers({
  session: sessionReducer,
  profile: profileReducer,
  biz: bizReducer,
  review: reviewReducer,
  booking: bookingReducer,
  location: locationReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  // in production enhancer should only apply thunk middleware
  enhancer = applyMiddleware(thunk);
} else {
  // in development we use redux dev tools and middleware
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  // if REDUX DEVTOOLS fails, use compose. apply thunk and logger
  // as middleware to enhancer
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
