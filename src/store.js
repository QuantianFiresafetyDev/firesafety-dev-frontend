import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxLogger from './reduxlogger';
import {createLogger} from 'redux-logger'
import createRootReducer from 'reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk'

const rootReducer = createRootReducer();

const logger = createLogger(reduxLogger);
  
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
	stateReconciler: autoMergeLevel2,
};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const kompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       actionsBlacklist: ['TOGGLE_PREV_POPOVER'],
//     })
//   : compose;
// const composedEnhancers = kompose(applyMiddleware(...middlewares));
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk, logger));
export const persistor = persistStore(store);

export default store;