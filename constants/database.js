export const db = 'db.realm';
import Realm from 'realm';
import {inProcess, localy} from '../constants/status';

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

// TEST
export const insertCheck = (dataInput) =>
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
              local_id: ID_index_num,
              id: action.data.id,
              fd: dataInput.fd,
              fn: dataInput.fn,
              fp: dataInput.fp,
              sum: dataInput.sum,
              timestamp: dataInput.timestamp,
              items: [],
              status_app: inProcess,
            }),
          );
          resolve(data);
        });
      })
      .catch((error) => reject(error));
  });

export const insertCheckLocaly = (dataInput) =>
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
              local_id: ID_index_num,
              // id: action.data.id,
              fd: dataInput.fd,
              fn: dataInput.fn,
              fp: dataInput.fp,
              sum: dataInput.sum,
              timestamp: dataInput.timestamp,
              items: [],
              status_app: localy,
            }),
          );
          resolve(data);
        });
      })
      .catch((error) => reject(error));
  });
