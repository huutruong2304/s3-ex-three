export const updatedObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const exceptObjectById = (arr, id) => {
  return arr.filter((obj) => obj.id !== id);
};
