export type PlaylistsType = {
  name: string;
  id: string;
  url: string;
  description: string;
  uri: string;
};

export type SelectedPlaylistDetails = PlaylistsType & {
  followers: number;
  ownerName: string;
  total: number;
};

export type FeaturedPlaylistsType = {
  message: string;
  playlists: PlaylistsType[];
};

export type Tracks = {
  id: string;
  trackName: string;
  uri: string;
  albumName: string;
  albumId: string;
  albumImage: string;
  dateAdded: string;
  duration: string;
  artists: { id: string; name: string; uri: string }[];
};

export type User = {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
};

export type Artists = {
  artistId: string;
  artistName: string;
  artistImg: string;
};

export type ArtistDetailsType = Artists & {
  followers: number;
  uri: string;
};

export type ArtistTracksType = Omit<Tracks, "artists" | "dateAdded">;

export type AlbumType = {
  albumId: string;
  albumName: string;
  type: string;
  releaseDate: string;
  albumImg: string;
};

export type AlbumDetailsType = AlbumType & {
  total: number;
  uri: string;
  artists: { id: string; name: string; uri: string }[];
  tracks: Omit<Tracks, "albumName" | "albumId" | "albumImage" | "dateAdded">[];
};

export type SearchedTracksType = Omit<Tracks, "dateAdded">;

export type InitialStateType = {
  token: string | null;
  playlists: PlaylistsType[] | null;
  selectedPlaylistId: string | null;
  selectedPlaylistDetails: SelectedPlaylistDetails | null;
  tracks: Tracks[];
  trackOffset: number;
  user: User | null;
  featuredPlaylist: FeaturedPlaylistsType | null;
  favouriteArtists: Artists[] | null;
  selectedArtistId: string | null;
  selectedArtistDetails: ArtistDetailsType | null;
  selectedArtistTracks: ArtistTracksType[];
  artistAlbums: AlbumType[] | null;
  relatedArtists: Artists[] | null;
  selectedAlbumId: string | null;
  selectedAlbumDetails: AlbumDetailsType | null;
  searchTerm: string;
  searchedTracks: SearchedTracksType[] | null;
  searchedArtists: Artists[] | null;
  searchedAlbums: AlbumType[] | null;
  searchedPlaylists: PlaylistsType[] | null;
  uris: string[];
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
  | { type: "SET_FEATURED_PLAYLISTS"; payload: FeaturedPlaylistsType }
  | { type: "SET_FAVOURITE_ARTISTS"; payload: Artists[] }
  | { type: "SET_SELECTED_ARTIST"; payload: string }
  | { type: "SET_SELECTED_ARTIST_DETAILS"; payload: ArtistDetailsType }
  | { type: "SET_ARTIST_TRACKS"; payload: ArtistTracksType[] }
  | { type: "SET_ALBUMS"; payload: AlbumType[] }
  | { type: "SET_RELATED_ARTISTS"; payload: Artists[] }
  | { type: "SET_SELECTED_ALBUM"; payload: string }
  | { type: "SET_SELECTED_ALBUM_DETAILS"; payload: AlbumDetailsType }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SEARCHED_TRACKS"; payload: SearchedTracksType[] }
  | { type: "SET_SEARCHED_ARTISTS"; payload: Artists[] }
  | { type: "SET_SEARCHED_ALBUMS"; payload: AlbumType[] }
  | { type: "SET_SEARCHED_PLAYLISTS"; payload: PlaylistsType[] }
  | { type: "SET_PLAYER_URIS"; payload: string[] };

export const initialState: InitialStateType = {
  token: null,
  playlists: null,
  selectedPlaylistId: null,
  selectedPlaylistDetails: null,
  tracks: [],
  trackOffset: 0,
  user: null,
  featuredPlaylist: null,
  favouriteArtists: null,
  selectedArtistId: null,
  selectedArtistDetails: null,
  selectedArtistTracks: [],
  artistAlbums: null,
  relatedArtists: null,
  selectedAlbumId: null,
  selectedAlbumDetails: null,
  searchTerm: "",
  searchedTracks: null,
  searchedArtists: null,
  searchedAlbums: null,
  searchedPlaylists: null,
  uris: [],
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

    case "SET_FAVOURITE_ARTISTS":
      return {
        ...initialState,
        favouriteArtists: action.payload,
      };

    case "SET_SELECTED_ARTIST":
      return {
        ...initialState,
        selectedArtistId: action.payload,
      };

    case "SET_SELECTED_ARTIST_DETAILS":
      return {
        ...initialState,
        selectedArtistDetails: action.payload,
      };

    case "SET_ARTIST_TRACKS":
      return {
        ...initialState,
        selectedArtistTracks: action.payload,
      };

    case "SET_ALBUMS":
      return {
        ...initialState,
        artistAlbums: action.payload,
      };

    case "SET_RELATED_ARTISTS":
      return {
        ...initialState,
        relatedArtists: action.payload,
      };

    case "SET_SELECTED_ALBUM":
      return {
        ...initialState,
        selectedAlbumId: action.payload,
      };
    case "SET_SELECTED_ALBUM_DETAILS":
      return {
        ...initialState,
        selectedAlbumDetails: action.payload,
      };

    case "SET_SEARCH_TERM":
      return {
        ...initialState,
        searchTerm: action.payload,
      };

    case "SET_SEARCHED_TRACKS":
      return {
        ...initialState,
        searchedTracks: action.payload,
      };

    case "SET_SEARCHED_ARTISTS":
      return {
        ...initialState,
        searchedArtists: action.payload,
      };

    case "SET_SEARCHED_ALBUMS":
      return {
        ...initialState,
        searchedAlbums: action.payload,
      };

    case "SET_SEARCHED_PLAYLISTS":
      return {
        ...initialState,
        searchedPlaylists: action.payload,
      };

    case "SET_PLAYER_URIS":
      return {
        ...initialState,
        uris: action.payload,
      };

    default:
      return initialState;
  }
};
