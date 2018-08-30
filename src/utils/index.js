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
