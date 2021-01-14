export const db = 'db.realm';
import dayjs from 'dayjs';
import Realm from 'realm';
import {completed, fnsError, inProcess, localy} from '../constants/status';
import {TimeUtc} from './time';

export const db_table = {
  name: 'Receipt',
  primaryKey: 'hash',
  properties: {
    hash: 'string',
    local_id: 'int?',
    id: 'int?',
    fd: 'string',
    fn: 'string',
    fp: 'string',
    fpd: 'string?',
    sum: 'string',
    final_sum: 'float?',
    code: 'int?',
    inn: 'string?',
    kkt: 'string?',
    timestamp: 'string',
    verified: 'bool?',
    status: 'int?',
    created_at: 'string?',
    updated_at: 'string?',
    retail_address: 'string?',
    retail_name: 'string?',
    retail_ofd: 'string?',
    items: {type: 'list', objectType: 'items'},
    fns_code: 'int?',
    fns_message: 'string?',
    status_app: 'string?',
  },
};

export const db_items = {
  name: 'items',
  primaryKey: 'hash',
  properties: {
    hash: 'string',
    brand_id: 'int?',
    name: 'string?',
    price: 'int?',
    product_group_id: 'int?',
    quantity: 'string?',
    sum: 'int?',
  },
};

export let realm = new Realm({
  path: db,
  schema: [db_table, db_items],
});

export let Receipt = realm.objects('Receipt');

export const insertCheck = (dataScan, hashSum) =>
  new Promise((resolve, reject) => {
    let data;
    Realm.open(realm)
      .then((realm) => {
        realm.write(() => {
          let ID_index_num =
            Receipt.sorted('local_id', true).length > 0
              ? Receipt.sorted('local_id', true)[0].local_id + 1
              : 1;
          realm.create(
            'Receipt',
            (data = {
              hash: hashSum,
              local_id: ID_index_num,
              id: dataScan.id,
              timestamp: dataScan.timestamp,
              sum: dataScan.sum,
              fn: dataScan.fn,
              fd: dataScan.fd,
              fp: dataScan.fp,
              verified: dataScan.verified,
              items: [],
              status_app: inProcess,
            }),
          );
        });
      })
      .then(() => resolve(data))
      .catch((error) => reject(error));
  });

export const insertCheckLocaly = (dataScan, hashSum) =>
  new Promise((resolve, reject) => {
    let data;
    Realm.open(realm)
      .then((realm) => {
        realm.write(() => {
          let ID_index_num =
            Receipt.sorted('local_id', true).length > 0
              ? Receipt.sorted('local_id', true)[0].local_id + 1
              : 1;
          realm.create(
            'Receipt',
            (data = {
              hash: hashSum,
              local_id: ID_index_num,
              timestamp: dayjs(dataScan.t).format(TimeUtc),
              sum: dataScan.s,
              fn: dataScan.fn,
              fd: dataScan.i,
              fp: dataScan.fp,
              verified: dataScan.verified,
              items: [],
              status_app: localy,
            }),
          );
        });
      })
      .then(() => resolve(data))
      .catch((error) => reject(error));
  });

export const updCheckLocaly = (dataScan, hashSum) =>
  new Promise((resolve, reject) => {
    let data;
    Realm.open(realm)
      .then((realm) => {
        realm.write(() => {
          realm.create(
            'Receipt',
            (data = {
              hash: hashSum,
              id: dataScan.id,
              timestamp: dataScan.timestamp,
              sum: dataScan.sum,
              fn: dataScan.fn,
              fd: dataScan.fd,
              fp: dataScan.fp,
              verified: dataScan.verified,
              items: [],
              status_app: inProcess,
            }),
            'modified',
          );
        });
      })
      .then(() => resolve(data))
      .catch((error) => reject(error));
  });

export const deleteCheck = (data) =>
  new Promise((resolve, reject) => {
    Realm.open(realm)
      .then((realm) => {
        realm.write(() => {
          let currentDeleteReceipt = realm.objectForPrimaryKey(
            'Receipt',
            data.hash,
          );
          let currentDeleteItem = realm.objectForPrimaryKey('items', data.hash);
          realm.delete(currentDeleteReceipt);
          currentDeleteItem ? realm.delete(currentDeleteItem) : null;
        });
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });

export const updCheckData = (dataScan, hashSum) =>
  new Promise((resolve, reject) => {
    let data;
    Realm.open(realm)
      .then((realm) => {
        if (!dataScan.fns_code && dataScan.verified) {
          realm.write(() => {
            let Receipt_data = realm.create(
              'Receipt',
              {
                hash: hashSum,
                id: dataScan.id,
                timestamp: dataScan.timestamp,
                sum: dataScan.sum,
                fn: dataScan.fn,
                fd: dataScan.fd,
                fp: dataScan.fp,
                verified: dataScan.verified,
                fns_code: dataScan.fns_code,
                fns_message: dataScan.fns_message,
                inn: dataScan.inn,
                kkt: dataScan.kkt,
                retail_address: dataScan.retail_address,
                retail_name: dataScan.retail_name,
                retail_ofd: dataScan.retail_ofd,
                items: [],
                status_app: completed,
              },
              'modified',
            );
            let i_data = 0;
            for (let dataItem of dataScan.items) {
                i_data += 1;
                Receipt_data.items.push({
                hash: hashSum + i_data,
                brand_id: dataItem.brand_id,
                name: dataItem.name,
                price: dataItem.price,
                product_group_id: dataItem.product_group_id,
                quantity: dataItem.quantity,
                sum: dataItem.sum,
              });
            }
          });
        } else if (dataScan.fns_code) {
          realm.write(() => {
            Receipt_data = realm.create(
              'Receipt',
              {
                hash: hashSum,
                verified: dataScan.verified,
                status_app: fnsError,
              },
              'modified',
            );
          });
        } else {
          console.log('Новый статус не получен');
        }
      })
      .then(() => resolve(data))
      .catch((error) => reject(error));
  });
