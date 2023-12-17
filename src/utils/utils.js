const MILISECONDS_IN_1_DAY = 86400000;

function convertStringToArray(string) {
  const arr = string.split(/(\r\n|\r|\n)/g)
    .filter(el => el.trim().length !== 0);
  return arr;
}

function convertArrayToMatrix(arr) {
  const matrix = arr.map(line => {
    return line.split(',')
      .map(el => el.trim())
      .filter(el => el.length > 0);
  });
  return matrix;
}

function isDateValid(dateString) {
  return !isNaN(new Date(dateString));
}

function getDate(dateString) {
  if (dateString.toLowerCase() === 'null') {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month.length === 1) {
      month = '0' + month;
    }
    const dayOfTheMonth = today.getDate();
    const todayString = `${year}-${month}-${dayOfTheMonth}`;
    return new Date(todayString);
  } else {
    return new Date(dateString);
  }
}

function doPeriodsOverlap(dateFrom1, dateTo1, dateFrom2, dateTo2) {
  dateFrom1 = getDate(dateFrom1);
  dateTo1 = getDate(dateTo1);
  dateFrom2 = getDate(dateFrom2);
  dateTo2 = getDate(dateTo2);
  return ((dateTo2 >= dateFrom1) && (dateFrom2 <= dateTo1));
}

function getNumberOfOverlappingDaysIn2Periods(dateFrom1, dateTo1, dateFrom2, dateTo2) {
  const dateFrom = Math.max(getDate(dateFrom1), getDate(dateFrom2));
  const dateTo = Math.min(getDate(dateTo1), getDate(dateTo2));
  let days = Math.round((dateTo - dateFrom) / MILISECONDS_IN_1_DAY) + 1;
  return days;
}

export {
  MILISECONDS_IN_1_DAY,
  convertStringToArray,
  convertArrayToMatrix,
  isDateValid,
  getDate,
  doPeriodsOverlap,
  getNumberOfOverlappingDaysIn2Periods,
};
