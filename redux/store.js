import HistoryReducer from "./Reducers/HistoryReducer";
import thunkMiddleware from 'redux-thunk';
const { combineReducers, createStore, applyMiddleware } = require("redux");
const { default: ScanReducer } = require("./Reducers/ScanReducer");
const { default: InputReducer } = require("./Reducers/InputReducer");


let reducers = combineReducers({
    // ScanScreen: ScanReducer,
    InputScreen: InputReducer,
    HistoryScreen: HistoryReducer,
});

// let store = createStore(reducers);

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store;
