const initialValue = {
  open: false,
};
export function loginDialog(state = initialValue, action) {
  switch (action.type) {
    case "SET_LOGIN_DIALOG_OPEN":
      return { ...state, open: true };
    case "SET_LOGIN_DIALOG_CLOSE":
      return { ...state, open: false };
    default:
      return { ...state, open: false };
  }
}
