import { takeEvery, put, call } from 'redux-saga/effects'
import { actions, actionTypes } from "./modules";
import axios from 'axios';

const { listItemsSuccess, listItems } = actions;

const {
    LIST_ITEMS,
    LIST_ITEMS_POST,
    LIST_ITEMS_DELETE,
    LIST_ITEMS_UPDATE,
} = actionTypes;


function* listItemsSaga(request, action) {
    const endpoint = `http://127.0.0.1:8000/api/todotasks/`
    let resp = yield call(axios.get, endpoint);
    yield put(listItemsSuccess(resp.data));
}
function* watchListItemsSaga(request) {
    yield takeEvery(LIST_ITEMS, listItemsSaga, request);
}


function* listItemPostSaga(request, action) {
    const endpoint = `http://127.0.0.1:8000/api/todotasks/`
    const { item } = action;
    const payload = { name: item }
    try{
        yield call(axios.post, endpoint, payload);
        yield put(listItems());
    } catch(e){
        console.log(e);
    }
}
function* watchListItemPostSaga(request) {
    yield takeEvery(LIST_ITEMS_POST, listItemPostSaga, request);
}


function* listItemsDeleteSaga(request, action) {
    const { id } = action;
    const endpoint = `http://127.0.0.1:8000/api/todotasks/${id}`
    yield call(axios.delete, endpoint);
    yield put(listItems());
}
function* watchListItemsDeleteSaga(request) {
    yield takeEvery(LIST_ITEMS_DELETE, listItemsDeleteSaga, request);
}


function* listItemUpdateSaga(request, action) {
    const { id, item } = action; 
    const endpoint = `http://127.0.0.1:8000/api/todotasks/${id}/`
    const payload = { name: item }
    try{
        yield call(axios.put, endpoint, payload);
        yield put(listItems());
    } catch(e){
        console.log(e);
    }
}
function* watchListItemUpdateSaga(request) {
    yield takeEvery(LIST_ITEMS_UPDATE, listItemUpdateSaga, request);
}


export default [
    watchListItemsSaga,
    watchListItemPostSaga,
    watchListItemsDeleteSaga,
    watchListItemUpdateSaga,
];
