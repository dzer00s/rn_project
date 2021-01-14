import {realm, Receipt} from '../constants/database';
import {
  RECEIVE_DATA,
  TOGGLE_IS_FETCHING,
  TOGGLE_IS_CHECK_ADDED,
  ADD_CURRENT_CHECK,
  TOGGLE_IS_MODAL_INPUT,
  TOGGLE_IS_SCANNER,
} from '../actions/types';

let initialState = {
  ScansList: [],
  isFetching: false,
  CheckIsAdded: false,
  currentCheck: {},
  InputCheckIsModalOpen: false,
  openScanner: false,
};

const ScanReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      console.log('updateHistoryList');
      return {
        ...state,
        ScansList: Receipt.sorted('local_id', true)
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

export default ScanReducer;
