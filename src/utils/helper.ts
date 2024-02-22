const isEmail = (text: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
};

const isPhone = (text: string) => {
  let reg = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  return reg.test(text);
};
const isDate = (text: string) => {
  let reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  return reg.test(text);
};
const isURL = (text: string) => {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(text);
};

// function numberFormat(number) {
//   if (!number) {return 0;}
//   number = Math.floor(number / 1000) * 1000;
//   return numeral(number).format('0,0');
// }

// function moneyFormat(number) {
//   return numberFormat(number) + ' đ';
// }
const dateFormat = (date: Date) => {
  if (date.getHours() < 10) {
    if (date.getMinutes() < 10) {
      return (
        `0${date.getHours()}:0${date.getMinutes()} ` +
        date.toLocaleDateString('en-GB')
      );
    } else {
      return (
        `0${date.getHours()}:${date.getMinutes()} ` +
        date.toLocaleDateString('en-GB')
      );
    }
  }
  return (
    `${date.getHours()}:${date.getMinutes()} ` +
    date.toLocaleDateString('en-GB')
  ); // 12 16:23 14/04/2023
};

const dateFormatV1 = (date: Date) => {
  return date.toLocaleDateString('en-GB'); // 14/04/2023
};

// 12/12/2020 -> date  type iso string
const convertDateToIOSString = (date: string) => {
  const dateArray = date.split('/');
  const dateConvert = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  return new Date(dateConvert).toISOString();
};
const getNumberWithoutCommas = (number: string) => {
  return parseInt(number.replace(/,/g, ''), 10);
};

export {
  isEmail,
  isURL,
  isPhone,
  isDate,
  // numberFormat,
  // moneyFormat,
  dateFormat,
  getNumberWithoutCommas,
  dateFormatV1,
  convertDateToIOSString,
};
