const accessInitialState = {
  accessed: false,
};
export const accessReducer = (state = accessInitialState, action) => {
  switch (action.type) {
    case "ACCESSED":
      return { ...state, accessed: true };
    default:
      return state;
  }
};
