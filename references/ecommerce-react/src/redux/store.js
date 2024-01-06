import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './rootSaga'

import rootReducer from './rootReducer'

// Initiate Saga middleware
const sagaMiddleware = createSagaMiddleware()

// compose redux with devtools extension
const enhancedComposer = composeWithDevTools({ trace: true })

// middlwares array
const middlewares = [sagaMiddleware]

// redux store
const store = createStore(
  rootReducer,
  enhancedComposer(applyMiddleware(...middlewares))
)

// Run sagas
sagaMiddleware.run(rootSaga)

// persisting parts of the store in browser storage
const persistor = persistStore(store)

export { store, persistor }
