//COLORS
export const colorHeader = '#DDDDDD';
export const colorBody = '#f2f2f2';
export const colorBodySec = '#e6e6e6';

//HEADER
let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', API_KEY);
export const headerData = myHeaders;

export const raw_in = (data) =>
  JSON.stringify({
    fd: data.fd,
    fn: data.fn,
    fp: data.fp,
    sum: data.sum,
    timestamp: data.timestamp,
    // hash: hashSum,
  });

// ADD_INPUT
export const requestOptionsInput = (inputqrvalue) => (  
  method = 'POST',
  headers = headerData,
  body = raw_in(inputqrvalue),
  redirect = 'follow'
);

export let dataScan = {};


      // ADD_SCAN
export const funcSeparator = (value) => {
  let subStrings = value.split('&');
  subStrings.map((element) => {
    let splitted = element.split('=');
    dataScan[splitted[0]] = splitted[1];
  });
}
export let rawScan = () =>  JSON.stringify({
  fd: dataScan.i,
  fn: dataScan.fn,
  fp: dataScan.fp,
  sum: dataScan.s,
  timestamp: toISOString(dataScan.t),
});


   // need Refactoring
function toISOString(qrDateString) {
  const parts = qrDateString.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);

  if (!parts) {
    throw Error('Invalid datestring format');
  }

  const date = new Date(
    Date.UTC(
      parseInt(parts[1], 10),
      parseInt(parts[2], 10) - 1,
      parseInt(parts[3], 10),
      parseInt(parts[4], 10),
      parseInt(parts[5], 10),
    ),
  );
  return date.toISOString();
}

export function thousands(number, separator) {
  var parts = ((number || number === 0 ? number : '') + '').split('.');

  if(parts.length) {
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1' + (separator || ' '))
  }

  return parts.join('.');
};
