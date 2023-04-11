const initialState = {
  baseurl: "dev.fill-easy.com",
  xclient: "cd89d333a7ec42d288421971dfb02d1d",
  xserver: "9b7a597d7a574d439566b259c5d67281a9829404e9024b20b1f42d5e99bb0673",
};
 
const base1 = 'testing.fill-easy.com';
const client = '2588100d923d4af382b6c4033b086419';
const secret = '21dd677be8984d0b836ac00304803709abd7ac0cb16e4151b539b88029219356';

function envReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BASE':
      return {
        ...state,
        baseurl: action.payload.base,
        xclient: action.payload.client,
        xserver: action.payload.secret,
      }
    case 'RESET_TEST':
      return {
        ...state,
        baseurl: base1,
        xclient: client,
        xserver: secret,
      }
    case 'RESET_DEV':
      return {
        ...initialState,
      }
    default:
      return state;
  }
}

export default envReducer;
