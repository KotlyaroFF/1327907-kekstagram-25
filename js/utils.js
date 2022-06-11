const createRandomNumder = (min, max) => {
  if (max <= min || min < 0) {
    return;
  }

  const number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
};

const inspectMaxLengthString = (string, maxLength) => {
  const stringInspect = maxLength >= string.length;
  return stringInspect;
};


const getArrRandomNumber = (min, max) => {
  const arrRandomNumber = [];
  for (let i = min; i <= max; i++) {
    let a = createRandomNumder(min, max);
    while (arrRandomNumber.includes(a)) {
      a = createRandomNumder(min, max);
    }
    arrRandomNumber.push(a);
  }
  return arrRandomNumber;
};

const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

const isEnterKey = (evt) => {
  return evt.key === 'Enter';
};


export {createRandomNumder, inspectMaxLengthString, getArrRandomNumber, isEscapeKey, isEnterKey};
