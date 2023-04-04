const initialState = {
  baseurl: "dev.fill-easy.com",
  xclient: "cd89d333a7ec42d288421971dfb02d1d",
  xserver: "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673",
};

function envReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BASE':
      return {
        ...state,
        baseurl: action.payload.base,
        xclient: action.payload.client,
        xserver: action.payload.secret,
      }


    default:
      return state;
  }
}

export default envReducer;
