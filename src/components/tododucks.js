import {handlersDefaultCase} from './helpers';
import { getChartData } from "../services/cart.service";
import { put,takeLatest, call } from "redux-saga/effects";

const PREFIX = 'CREATE_CART';
const SET_DATA = `${PREFIX}//SET_DATA`;
const SET_LOADING = `${PREFIX}//SET_LOADING`;
const SET_ERRORS = `${PREFIX}//SET_ERRORS`;
const GET_DATA = `${PREFIX}//GET_DATA`;
const UPDATE_DATA = `${PREFIX}//UPDATE_DATA`;
const GET_TOTAL = `${PREFIX}//GET_TOTAL`;
const SET_TOTAL = `${PREFIX}//SET_TOTAL`;
const SET_ITEMNUMBERS = `${PREFIX}//SET_ITEMNUMBERS`;
const GET_ITEMNUMBERS = `${PREFIX}//GET_ITEMNUMBERS`;




const initState = {
    chartData:[],
    loading: false,
    total:0,
    error:'',
    itemNumbers:0
};

export const createtodoReducer = (state = initState, action = {}) => {
    const handlers = {
        [SET_DATA]: () => ({ ...state, chartData: action.payload }),
        [SET_LOADING]: () => ({ ...state, loading: action.payload }),
        [SET_ERRORS]: () => ({ ...state, error: action.payload }),
        [SET_TOTAL]: () => ({ ...state, total: action.payload }),
        [SET_ITEMNUMBERS]: () => ({ ...state, itemNumbers: action.payload }),
    };
    return handlersDefaultCase(handlers, action, state);
   
};

export function* ChartDataSaga() {
    yield takeLatest(GET_DATA, getChartDataSaga);
    yield takeLatest(UPDATE_DATA, updateChartDataSaga);


}

function* getChartDataSaga(action) {
    yield put({ type: SET_LOADING, payload: true });
    try {
        const result = yield call(getChartData);
        let total=0;
        result.forEach(element => {
            total = total +Number(element.price);
            element['quantity']=1;
        });
        yield put({ type: SET_DATA, payload: result});
        yield put({ type: SET_ITEMNUMBERS, payload: result.length});
        yield put({ type: SET_TOTAL, payload: total});
        yield put({ type: SET_LOADING, payload: false });
    } catch (e) {
        yield put({ type: SET_ERRORS, payload: e });
        yield put({ type: SET_LOADING, payload: false });
    }
}
function* updateChartDataSaga(action) {
    yield put({ type: SET_LOADING, payload: true });
    try {
        const result = action.payload.data;
        let total=0;
        let itemNo=0;
        result.forEach(element => {
            total = total + (element.quantity * Number(element.price));
            itemNo = itemNo+ element.quantity;
        });
        yield put({ type: SET_ITEMNUMBERS, payload: itemNo});
        yield put({ type: SET_DATA, payload: result});
        yield put({ type: SET_TOTAL, payload: total});

        yield put({ type: SET_LOADING, payload: false });
        console.log(initState.chartData)
    } catch (e) {
        yield put({ type: SET_ERRORS, payload: e });
        yield put({ type: SET_LOADING, payload: false });
    }
}
const addTodo = (task) => ({ type: GET_DATA ,payload: { task }});
const updateChartData = (data) => ({ type: UPDATE_DATA ,payload: {data:data}});


export const getTasks = state => state.createtodoReducer.chartData;
export const getTotal = state => state.createtodoReducer.total;
export const getItemNo = state => state.createtodoReducer.itemNumbers;



export const creatTodoActions = {
    addTodo,
    updateChartData
};

export default createtodoReducer;