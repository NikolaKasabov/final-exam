const MILISECONDS_IN_1_DAY = 86400000;

function convertStringToArray(string) {
  const arr = string.split(/(\r\n|\r|\n)/g)
    .filter(el => el.trim().length !== 0);
  return arr;
}

/*
  returns data in format:
  [
    [employeeId, projectId, dateFrom, dateTo],
    [employeeId, projectId, dateFrom, dateTo],
    ...
  ]
*/
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

/*
  returns data in format:
    {
      'employee1Id,employee2Id': { project10Id: days, project20Id: days },
      'employee3Id,employee4Id': { project30Id: days },   // shows how many days employee3 and employee4 have worked together on project30
      ...
    }
*/
function getUnfilteredData(matrix) {
  const result = {};

  for (let i = 0; i < matrix.length - 1; i++) {
    for (let j = (i + 1); j < matrix.length; j++) {
      const row1 = matrix[i];
      const row2 = matrix[j];

      if (row1[0] !== row2[0]                                        // different employees ids
        && row1[1] === row2[1]                                       // same project ids
        && doPeriodsOverlap(row1[2], row1[3], row2[2], row2[3])) {   // overlapping periods
        const employeesIds = `${row1[0]},${row2[0]}`;
        const projectId = row1[1];
        const days = getNumberOfOverlappingDaysIn2Periods(row1[2], row1[3], row2[2], row2[3]);

        if (!result.hasOwnProperty(employeesIds)) {
          result[employeesIds] = {
            [projectId]: days,
          };
        } else {
          if (!result[employeesIds].hasOwnProperty(projectId)) {
            result[employeesIds][projectId] = days;
          } else {
            result[employeesIds][projectId] += days;
          }
        }
      }
    }
  }

  return result;
}

export {
  MILISECONDS_IN_1_DAY,
  convertStringToArray,
  convertArrayToMatrix,
  isDateValid,
  getDate,
  doPeriodsOverlap,
  getNumberOfOverlappingDaysIn2Periods,
  getUnfilteredData,
};
