import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import fullProposalReducer from "./FullProposal/fullProposalReducer";
import thunk from "redux-thunk";

/**
 * config for the persist store
 */
 const persistConfig = {
    key: 'fullProposal',
    storage,
    whitelist: [
      'fullProposalState'
    ],
    debug: true,
    serialize: true
  }

/**
 * combine reducers is an object that combines all of them into one since
 * createStore() can only take 1 argument
 */
const rootReducer = combineReducers({fullProposalState: fullProposalReducer});

/**
 * combine the rootreducer and the persist config to let the persist lib know which states will need to persist thru refresh's
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

/**
 * we create the persist store with all the reducers and its config of who persists thru refreshs and not it hooks all together
 */
 const persistorStore = persistStore(store);

export { 
    store, 
    persistorStore 
};
