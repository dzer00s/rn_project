// import Axios from 'axios';
// import {scanAPI} from '../../api/api';
// import { API_KEY } from '../../constants/app_env';
// import {db} from '../../constants/database';
// import { inProcess } from '../../constants/status';
// import {ADD_SCAN} from './../types';

// let initialState = {
//   messagesData: '|dataBeforeScan|',
//   dataScan: [],
// };

// let data = {};

// let realm;
// realm = new Realm({path: db});

// function funcSeparator(value) {
//   let newQrValue = value;
//   let subStrings = newQrValue.split('&');
//   subStrings.map((element) => {
//     let splitted = element.split('=');
//     data[splitted[0]] = splitted[1];
//   });
// }

// function toISOString(qrDateString) {
//   const parts = qrDateString.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);

//   if (!parts) {
//     throw Error('Invalid datestring format');
//   }

//   const date = new Date(
//     Date.UTC(
//       parseInt(parts[1], 10),
//       parseInt(parts[2], 10) - 1,
//       parseInt(parts[3], 10),
//       parseInt(parts[4], 10),
//       parseInt(parts[5], 10),
//     ),
//   );
//   return date.toISOString();
// }

// const ScanReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_SCAN:
//       // Разбор строки
//       // funcSeparator('t=20201102T1537&s=370.0&fn=92321321&i=843213&fp=321321312&n=1');
//       funcSeparator(action.qrvalue);
//       let dataTimeStamp = toISOString(data.t);

//       // POST запрос
//       var myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');
//       myHeaders.append(
//         'Authorization',
//         API_KEY,
//       );
//       var raw = JSON.stringify({
//         fd: data.i,
//         fn: data.fn,
//         fp: data.fp,
//         sum: data.s,
//         // timestamp: "2020-10-13T15:17:00Z",
//         timestamp: dataTimeStamp,
//       });

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow',
//       };

//       fetch('http://172.16.13.44:8086/receipts', requestOptions).then(
//         (response) => {
//           if (response.status === 201) {
//             alert('Успешно добавлен');
//             response
//               .json()
//               .then((result) => {
//                 // Запись в БД
//                 realm.write(() => {
//                   let ID_index_num =
//                   realm.objects('Receipt').sorted('id_index', true).length > 0
//                     ? realm.objects('Receipt').sorted('id_index', true)[0]
//                         .id_index + 1
//                     : 1;
//                   realm.create('Receipt', {
//                     id: result.id,
//                     id_index: ID_index_num,
//                     fd: result.fd,
//                     fn: result.fn,
//                     fp: result.fp,
//                     sum: result.sum,
//                     timestamp: result.timestamp,
//                     verified: result.verified,
//                     items: [],
//                     status_app: inProcess,
//                   });
//                 });
//               })
//               .catch((error) => alert(error));
//           } else {
//             alert('Ошибка со статусом ' + response.status);
//           }
//         },
//       );

//       // scanAPI.getStatus(26).then(response => {
//       //   alert(response.data)
//       // });
//       return {
//         ...state,
//         // dataScan: data,
//         // messagesData: newQrValue,
//       };

//     default:
//       return state;
//   }
// };

// export default ScanReducer;
