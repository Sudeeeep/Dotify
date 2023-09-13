import { Dispatch, ReactNode, createContext, useReducer } from "react";
import {
  ActionType,
  InitialStateType,
  initialState,
  stateReducer,
} from "./reducer";

type InitialContextProps = {
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
};

export const StateContext = createContext({} as InitialContextProps);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
