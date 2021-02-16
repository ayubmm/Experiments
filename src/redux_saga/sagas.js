import {put, takeEvery, all, takeLatest, call} from 'redux-saga/effects';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getUsersFunc = async () => {
  return await (
    await fetch('https://randomuser.me/api/?results=10&&inc=gender,name,nat')
  ).json();
};

// ...

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  console.log('incrementAsync started...');
  yield call(delay, 1000);
  yield put({type: 'INCREMENT'});
}

// Our watcher Saga: spawn a new incrementAsync task on latest INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeLatest('SAGA_INCREMENT', incrementAsync);
}

export function* watchgetRandomUsers() {
  yield takeLatest('GET_RANDOM_USERS', getRandomUsers);
}

export function* getRandomUsers() {
  // fetch('https://randomuser.me/api/?results=10&&inc=gender,name,nat')
  //   .then((res) => res.json())
  //   .then((resJS) => {
  //     console.log('respon api', resJS);
  //   });

  let result = yield call(getUsersFunc);

  console.log('ini hasil call', result);
}

export function* helloSaga() {
  setTimeout(() => {
    console.log('Hello Sagas!');
  }, 3000);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchgetRandomUsers()]);
}
