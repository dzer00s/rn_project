import {scanAPI} from '../api/api';
import {rawScan} from '../constants/app_env';
import {
  TOGGLE_IS_FETCHING,
  ADD_CURRENT_CHECK,
  TOGGLE_IS_CHECK_ADDED,
  TOGGLE_IS_MODAL_INPUT,
  TOGGLE_IS_SCANNER,
} from './types';
import {receiveData} from './HistoryActions';
import {md5} from '../constants/md5';
import {
  deleteCheck,
  insertCheck,
  insertCheckLocaly,
  updCheckData,
  updCheckLocaly,
} from '../constants/database';

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

export const addCheckThunk = (dataScan) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  let hashSum = md5(String(dataScan.fn + dataScan.i + dataScan.fp));
  scanAPI
    .setInput(rawScan(dataScan, false))
    .then((response) => {
      if (response.status === 201) {
        insertCheck(response.data, hashSum)
          .then((data) => {
            dispatch(addCurrentCheck(hashSum));
            dispatch(toggleIsModalInput(true));
            dispatch(toggleIsCheckAdded(false));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(response.status);
      }
    })
    .catch((err) => {
      insertCheckLocaly(dataScan, hashSum)
        .then((data) => {
          dispatch(addCurrentCheck(hashSum));
          dispatch(toggleIsModalInput(true));
          dispatch(toggleIsCheckAdded(false));
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .finally(() => {
      dispatch(receiveData());
      dispatch(toggleIsFetching(false));
    });
};

export const addScanCheckThunk = (dataScan) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  let hashSum = md5(String(dataScan.fn + dataScan.i + dataScan.fp));
  scanAPI
    .setInput(rawScan(dataScan, true))
    .then((response) => {
      if (response.status === 201) {
        insertCheck(response.data, hashSum)
          .then((data) => {
            dispatch(addCurrentCheck(hashSum));
            dispatch(toggleIsCheckAdded(false));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(response.status);
      }
    })
    .catch((err) => {
      insertCheckLocaly(dataScan, hashSum)
        .then((data) => {
          dispatch(addCurrentCheck(hashSum));
          dispatch(toggleIsCheckAdded(false));
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .finally(() => {
      dispatch(receiveData());
      dispatch(toggleIsFetching(false));
    });
};

export const updCheckLocalyThunk = (data) => (dispatch) => {
  scanAPI
    .setInput(data)
    .then((response) => {
      if (response.status === 201) {
        updCheckLocaly(response.data, data.hash)
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        console.log(response.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUpdDataCheckThunk = (data) => (dispatch) => {
  scanAPI
    .updData(data)
    .then((response) => {
      if (response.status === 200) {
        for (let dataScan of response.data) {
          let hashSum = md5(String(dataScan.fn + dataScan.fd + dataScan.fp));
          updCheckData(dataScan, hashSum).then(() => {
            console.log("Данные обновлены");
          }).catch((error) => {
            console.log(error);
          })
          }
      } else {
        console.log(response.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCheckThunk = (data) => (dispatch) => {
  deleteCheck(data).then(() => {
    console.log("Удален");
  }).catch((error) => {
    console.log(error);
  })
};
