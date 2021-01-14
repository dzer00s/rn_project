//COLORS
export const colorHeader = '#DDDDDD';
export const colorBody = '#f2f2f2';
export const colorBodySec = '#e6e6e6';
export const colorDelete = '#d4180e';

export const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const rawScan = (data, isScan) =>
  JSON.stringify({
    timestamp: (!isScan ? data.t : toISOString(data.t)),
    sum: data.s,
    fn: data.fn,
    fd: data.i,
    fp: data.fp,
    // hash: hashSum,
  });

// ADD_SCAN
export const funcSeparator = (value, dataScan) => {
  let subStrings = value.split('&');
  subStrings.map((element) => {
    let splitted = element.split('=');
    dataScan[splitted[0]] = splitted[1];
  });
}

function toISOString(qrDateString) {
  let parts = qrDateString.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);
  if (!parts) {
    parts = qrDateString.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/);
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

// total 
export function thousands(number, separator) {
  var parts = ((number || number === 0 ? number : '') + '').split('.');

  if(parts.length) {
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1' + (separator || ' '))
  }

  return parts.join('.');
};
