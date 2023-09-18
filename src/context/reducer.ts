export type PlaylistsType = {
  name: string;
  id: string;
  url: string;
};

export type InitialStateType = {
  token: string | null;
  playlists: PlaylistsType[] | null;
};

export type ActionType = {
  type: string;
  payload: string | PlaylistsType[];
};

export const initialState: InitialStateType = {
  token: null,
  playlists: null,
};

export const stateReducer = (
  initialState: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "SET_TOKEN":
      if (typeof action.payload === "string") {
        return {
          ...initialState,
          token: action.payload,
        };
      }
      return initialState;

    case "SET_PLAYLISTS":
      if (typeof action.payload === "object") {
        return {
          ...initialState,
          playlists: action.payload,
        };
      }
      return initialState;

    default:
      return initialState;
  }
};
