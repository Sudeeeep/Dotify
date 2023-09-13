export type InitialStateType = {
  token: string | null;
};

export type ActionType = {
  type: string;
  payload: string;
};

export const initialState: InitialStateType = {
  token: null,
};

export const stateReducer = (
  initialState: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...initialState,
        token: action.payload,
      };

    default:
      return initialState;
  }
};
