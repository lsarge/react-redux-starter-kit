export const renameObjectKeys = (keysMap, object) => {
  return Object.keys(object).reduce((accumulator, key) => {
    const newObject = {
      [keysMap[key] || key] : object[key],
    };
    return {
      ...accumulator,
      ...newObject
    };
  }, {});
};
// eslint-disable-next-line
export const validateEmail = email => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
