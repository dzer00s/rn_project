import {scanAPI} from '../../api/api';
import {funcSeparator, raw_in, rawScan, dataScan} from '../../constants/app_env';
import {
  ADD_IN_DB,
  ADD_IN_DB_LOCALY,
  TOGGLE_IS_FETCHING,
  ADD_CURRENT_CHECK,
  TOGGLE_IS_CHECK_ADDED,
  TOGGLE_IS_MODAL_INPUT,
  TOGGLE_IS_SCANNER,
  DELETE_IN_DB,
} from './../types';
import {receiveData} from './HistoryActions';
// import {insertCheck, insertCheckLocaly} from '../../constants/database';
import { md5 } from '../../constants/md5';

export const addInDB = (data, hashSum) => ({
  type: ADD_IN_DB,
  data, hashSum
});

export const addInDBLocaly = (data, hashSum) => ({
  type: ADD_IN_DB_LOCALY,
  data, hashSum
});

export const deleteInDB = (data) => ({
  type: DELETE_IN_DB,
  data,
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  switchFetching: isFetching,
});

export const toggleIsCheckAdded = (CheckIsAdded) => ({
  type: TOGGLE_IS_CHECK_ADDED,
  CheckIsAdded,
});

export const addCurrentCheck = (hashSum) => ({
  type: ADD_CURRENT_CHECK,
  hashSum,
});

export const toggleIsModalInput = (InputCheckIsModalOpen) => ({
  type: TOGGLE_IS_MODAL_INPUT,
  InputCheckIsModalOpen,
});

export const toggleIsScanner = (openScanner) => ({
  type: TOGGLE_IS_SCANNER,
  openScanner,
});

export const addCheckThunk = (inputqrvalue) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  let hash = String(inputqrvalue.fd + inputqrvalue.fn + inputqrvalue.fp);
  let hashSum = md5(hash);
  console.log(hash);
  console.log(hashSum);
  scanAPI
    .setInput(raw_in(inputqrvalue))
    .then((response) => {
      if (response.status === 201) {
        dispatch(addInDB(response.data, hashSum));
        console.log('Успешно добавлен');
        dispatch(receiveData());
        dispatch(addCurrentCheck(hashSum));
        dispatch(toggleIsModalInput(true));
        dispatch(toggleIsFetching(false));
        dispatch(toggleIsCheckAdded(false));
        // insertCheck(response.data);
      } else {
        console.log('Что то пошло не так');
        dispatch(toggleIsFetching(false));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(addInDBLocaly(inputqrvalue, hashSum))
      console.log('Успешно добавлен локально');
      dispatch(receiveData());
      dispatch(addCurrentCheck(hashSum));
      dispatch(toggleIsModalInput(true));
      dispatch(toggleIsFetching(false));
      dispatch(toggleIsCheckAdded(false));
      // insertCheckLocaly(rawScan(dataScan));
    })
};

export const addScanCheckThunk = (qrvalue) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  funcSeparator(qrvalue);
  let hash = String(dataScan.i + dataScan.fn + dataScan.fp);
  let hashSum = md5(hash);
  console.log(hash);
  console.log(hashSum);
  scanAPI
    .setInput(rawScan())
    .then((response) => {
      if (response.status === 201) {
        dispatch(addInDB(response.data, hashSum));
        console.log('Успешно добавлен');
        dispatch(receiveData());
        dispatch(addCurrentCheck(hashSum));
        dispatch(toggleIsFetching(false));
        dispatch(toggleIsCheckAdded(false));
        // insertCheck(response.data);
      } else {
        console.log('Что то пошло не так');
        dispatch(toggleIsFetching(false));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(addInDBLocaly(dataScan, hashSum))
      console.log('Успешно добавлен локально');
      dispatch(receiveData());
      dispatch(addCurrentCheck(hashSum));
      dispatch(toggleIsFetching(false));
      dispatch(toggleIsCheckAdded(false));
      // insertCheckLocaly(rawScan(dataScan));
    });
};
