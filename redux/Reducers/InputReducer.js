import {realm, Receipt} from '../../constants/database';
import {inProcess, localy} from '../../constants/status';
import {
  ADD_IN_DB,
  ADD_IN_DB_LOCALY,
  RECEIVE_DATA,
  TOGGLE_IS_FETCHING,
  TOGGLE_IS_CHECK_ADDED,
  ADD_CURRENT_CHECK,
  TOGGLE_IS_MODAL_INPUT,
  TOGGLE_IS_SCANNER,
  DELETE_IN_DB,
} from './../types';

let initialState = {
  ScansList: [],
  isFetching: false,
  CheckIsAdded: false,
  currentCheck: {},
  ID_index: 0,
  InputCheckIsModalOpen: false,
  openScanner: false,
};

// let data;

// export let dataScan = {};

const InputReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      console.log('updateHistoryList');
      return {
        ...state,
        ScansList: Receipt,
      };

    case ADD_IN_DB:
      // Запись в БД
      realm.write(() => {
        state.ID_index =
          Receipt.sorted('local_id', true).length > 0
            ? Receipt.sorted('local_id', true)[0].local_id + 1
            : 1;
        realm.create('Receipt', {
          hash: action.hashSum,
          local_id: state.ID_index,
          id: action.data.id,
          fd: action.data.fd,
          fn: action.data.fn,
          fp: action.data.fp,
          sum: action.data.sum,
          timestamp: action.data.timestamp,
          verified: action.data.verified,
          items: [],
          status_app: inProcess,
        });
      });
      return {
        ...state,
      };

    case ADD_IN_DB_LOCALY:
      // Запись в БД ЛОКАЛЬНО
      realm.write(() => {
        state.ID_index =
          Receipt.sorted('local_id', true).length > 0
            ? Receipt.sorted('local_id', true)[0].local_id + 1
            : 1;
        realm.create('Receipt', {
          hash: action.hashSum,
          local_id: state.ID_index,
          fd: action.data.fd ? action.data.fd : action.data.i,
          fn: action.data.fn,
          fp: action.data.fp,
          sum: action.data.sum ? action.data.sum : action.data.s,
          timestamp: action.data.timestamp
            ? action.data.timestamp
            : action.data.t,
          verified: action.data.verified,
          items: [],
          status_app: localy,
        });
      });
      return {
        ...state,
      };

    case DELETE_IN_DB:
      // Удаление из БД
      console.log('delete from db');
      realm.write(() => {
        let currentDeleteReceipt = realm.objectForPrimaryKey(
          'Receipt',
          action.data.hash,
        );
        let currentDeleteItem = realm.objectForPrimaryKey(
          'items',
          action.data.hash,
        );
        realm.delete(currentDeleteReceipt);
        realm.delete(currentDeleteItem);
      });
      return {
        ...state,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.switchFetching,
      };

    case TOGGLE_IS_CHECK_ADDED:
      return {
        ...state,
        CheckIsAdded: !action.CheckIsAdded,
      };

    case ADD_CURRENT_CHECK:
      let currentReceipt = realm.objectForPrimaryKey('Receipt', action.hashSum);
      return {
        ...state,
        currentCheck: currentReceipt,
      };
    case TOGGLE_IS_MODAL_INPUT:
      return {
        ...state,
        InputCheckIsModalOpen: !action.InputCheckIsModalOpen,
      };
    case TOGGLE_IS_SCANNER:
      return {
        ...state,
        openScanner: action.openScanner,
      };

    default:
      return state;
  }
};

export default InputReducer;
