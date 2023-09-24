export type PlaylistsType = {
  name: string;
  id: string;
  url: string;
};

export type SelectedPlaylistDetails = PlaylistsType & {
  description: string;
  followers: number;
  ownerName: string;
  total: number;
};

export type Tracks = {
  id: string;
  trackName: string;
  uri: string;
  album: string;
  albumImage: string;
  dateAdded: string;
  duration: number;
  artists: [{ id: string; name: string; uri: string }];
};

export type InitialStateType = {
  token: string | null;
  playlists: PlaylistsType[] | null;
  selectedPlaylistId: string | null;
  selectedPlaylistDetails: SelectedPlaylistDetails | null;
  tracks: Tracks[];
  trackOffset: number;
};

export type ActionType =
  | { type: "SET_TOKEN"; payload: string }
  | { type: "SET_PLAYLISTS"; payload: PlaylistsType[] }
  | { type: "SET_SELECTED_PLAYLIST"; payload: string }
  | { type: "SET_SELECTED_PLAYLIST_DETAILS"; payload: SelectedPlaylistDetails }
  | { type: "SET_TRACKS"; payload: Tracks[] }
  | { type: "RESET_TRACKS" }
  | { type: "SET_TRACK_OFFSET"; payload: number };

export const initialState: InitialStateType = {
  token: null,
  playlists: null,
  selectedPlaylistId: null,
  selectedPlaylistDetails: null,
  tracks: [],
  trackOffset: 0,
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

    case "SET_PLAYLISTS":
      return {
        ...initialState,
        playlists: action.payload,
      };

    case "SET_SELECTED_PLAYLIST":
      return {
        ...initialState,
        selectedPlaylistId: action.payload,
      };

    case "SET_SELECTED_PLAYLIST_DETAILS":
      return {
        ...initialState,
        selectedPlaylistDetails: action.payload,
      };

    case "SET_TRACKS": {
      return {
        ...initialState,
        tracks: initialState.tracks.concat(action.payload),
      };
    }

    case "RESET_TRACKS":
      return {
        ...initialState,
        tracks: [],
      };

    case "SET_TRACK_OFFSET":
      return {
        ...initialState,
        trackOffset: action.payload,
      };

    default:
      return initialState;
  }
};
