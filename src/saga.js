import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchTweets() {
  return axios({
    method: "get",
    url: "http://localhost:8000/fetch_tweets/"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() { //* in function indicates a generator function, see ES^ docs 
  try {
    const response = yield call(fetchTweets);
    const tweet = response.data.message;

    // dispatch a success action to the store with the new tweet 
    yield put({ type: "API_CALL_SUCCESS", tweet });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}