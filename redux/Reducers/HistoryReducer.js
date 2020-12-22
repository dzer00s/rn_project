import {historyAPI} from '../../api/api';
import {db, realm, Receipt} from '../../constants/database';
import {md5} from '../../constants/md5';
import {completed} from '../../constants/status';
import {GET_HISTORY, TOGGLE_IS_MODAL, UPD_DATA, RECEIVE_DATA} from './../types';

let initialState = {
  messagesData: '|dataBeforeScan|',
  // HistoryList: [],
  isModalOpen: false,
};

let data = {};

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_MODAL:
      return {
        ...state,
        isModalOpen: !action.isModalOpen,
      };

    case UPD_DATA:
      historyAPI
        .updData(action.ids)
        .then((response) => {
          if (response.status === 200) {
            console.log('Успешно отправлен запрос');
            console.log(response.data);
            for (let data of response.data) {
              // Формирование hash
              let hash = String(data.fd + data.fn + data.fp);
              let hashSum = md5(hash);
              console.log(hashSum);
              // Запись в БД
              if (!data.fns_code && data.verified) {
                realm.write(() => {
                  let Receipt_data = realm.create(
                    'Receipt',
                    {
                      hash: hashSum,
                      id: data.id,
                      fd: data.fd,
                      fn: data.fn,
                      fp: data.fp,
                      sum: data.sum,
                      verified: data.verified,
                      fns_code: data.fns_code,
                      fns_message: data.fns_message,
                      // fpd: data.fpd,
                      inn: data.inn,
                      kkt: data.kkt,
                      retail_address: data.retail_address,
                      retail_name: data.retail_name,
                      retail_ofd: data.retail_ofd,
                      timestamp: data.timestamp,
                      items: [],
                      status_app: completed,
                    },
                    'modified',
                  );
                  Receipt_data.items.push(
                    {
                      hash: hashSum,
                      brand_id: data.items.brand_id,
                      name: data.items.name,
                      price: data.items.price,
                      product_group_id: data.items.product_group_id,
                      quantity: data.items.quantity,
                      sum: data.items.sum,
                    },
                    // 'modified',
                  );
                });
              } else if (result.fns_code) {
                realm.write(() => {
                  Receipt_data = realm.create(
                    'Receipt',
                    {
                      id: id_Act,
                      verified: result.verified,
                      status_app: fnsError,
                    },
                    'modified',
                  );
                });
              } else {
                console.log('Новый статус не получен');
              }
            }
          } else {
            console.log('Ошибка со статусом ' + response.status);
          }
        })
        .catch((error) => alert(error));
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default HistoryReducer;
