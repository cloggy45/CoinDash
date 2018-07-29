export const option = (currentState = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED":
      return Object.assign({}, currentState, {
        selected: action.payload
      });
    default:
      return currentState;
  }
};
