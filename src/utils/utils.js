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

export {
  convertStringToArray,
  convertArrayToMatrix
};
