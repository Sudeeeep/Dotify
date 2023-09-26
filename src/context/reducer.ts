import { User } from "../components/User";

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

type FeaturedPlaylistsDetails = PlaylistsType & {
  description: string;
};

export type FeaturedPlaylists = {
  message: string;
  playlists: FeaturedPlaylistsDetails[];
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

export type User = {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
};

export type InitialStateType = {
  token: string | null;
  playlists: PlaylistsType[] | null;
  selectedPlaylistId: string | null;
  selectedPlaylistDetails: SelectedPlaylistDetails | null;
  tracks: Tracks[];
  trackOffset: number;
  user: User | null;
  featuredPlaylist: FeaturedPlaylists | null;
};

export type ActionType =
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "SET_PLAYLISTS"; payload: PlaylistsType[] }
  | { type: "SET_SELECTED_PLAYLIST"; payload: string }
  | { type: "SET_SELECTED_PLAYLIST_DETAILS"; payload: SelectedPlaylistDetails }
  | { type: "SET_TRACKS"; payload: Tracks[] }
  | { type: "RESET_TRACKS" }
  | { type: "SET_TRACK_OFFSET"; payload: number }
  | { type: "SET_USER"; payload: User }
  | { type: "SET_FEATURED_PLAYLISTS"; payload: FeaturedPlaylists };

export const initialState: InitialStateType = {
  token: null,
  playlists: null,
  selectedPlaylistId: null,
  selectedPlaylistDetails: null,
  tracks: [],
  trackOffset: 0,
  user: null,
  featuredPlaylist: null,
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

    case "SET_USER":
      return {
        ...initialState,
        user: action.payload,
      };

    case "SET_FEATURED_PLAYLISTS":
      return {
        ...initialState,
        featuredPlaylist: action.payload,
      };

    default:
      return initialState;
  }
};
