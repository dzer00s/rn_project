import HistoryReducer from "./reducers/HistoryReducer";
import thunkMiddleware from 'redux-thunk';
const { combineReducers, createStore, applyMiddleware } = require("redux");
const { default: ScanReducer } = require("./reducers/ScanReducer");


let reducers = combineReducers({
    ScanScreen: ScanReducer,
    HistoryScreen: HistoryReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store;
