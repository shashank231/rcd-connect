import App1Saga from '../App-1/redux/sagas';
import { all } from  'redux-saga/effects';

const array1 = [...App1Saga];

function* rootSaga() {
    yield all(
        array1.map(saga => saga())
    );
}

export default rootSaga;