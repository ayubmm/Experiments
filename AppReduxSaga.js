import React from 'react';
import rootSaga from './src/redux_saga/sagas';
import Counter from './src/redux_saga/Counter';
import reducer from './src/redux_saga/reducers';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {useSelector, Provider} from 'react-redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const action = (type) => store.dispatch({type});

function CounterSaga() {
  const value = useSelector((state) => state);
  console.log('getstate = ', value);
  return (
    <Counter
      value={value}
      onGetUsers={() => action('GET_RANDOM_USERS')}
      onSagaIncrement={() => action('SAGA_INCREMENT')}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
    />
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <CounterSaga />
    </Provider>
  );
};

export default App;
