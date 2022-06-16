export const initialState = {
  notify: {
    message: "",
    type: "info",
    open: false,
  },
};

export type AppState = typeof initialState;
export type AppAction = {
  type: string;
  payload: any;
};

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "SET_NOTIFY":
      return {
        ...state,
        notify: action.payload,
      };
    case "UNSET_NOTIFY":
      return {
        ...state,
        notify: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
