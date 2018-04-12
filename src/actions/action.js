export const click = () => {
  return {
    type: "CLICKED",
    isClicked: true
  };
};

export const isLoaded = () => {
  return {
    type: "IS_LOADED",
    isLoaded: true
  };
};
