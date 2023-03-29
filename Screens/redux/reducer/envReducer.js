const initialState = {
  baseurl: "dev.fill-easy.com",
  xclient: "cd89d333a7ec42d288421971dfb02d1d",
  xserver: "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673",
};

function envReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_BASE_URL":
      return { ...state, baseurl: action.payload };
      case "SET_XCLIENT":
      return { ...state, xclient: action.payload };
      case "SET_XSERVER":
      return { ...state, xserver: action.payload };


    default:
      return state;
  }
}

export default envReducer;
