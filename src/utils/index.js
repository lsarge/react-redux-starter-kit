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

export const visiblyHiddenStyle = {
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px',
}
