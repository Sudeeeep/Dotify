export interface PlaylistTracksResponse {
  items: Item[];
}

interface Item {
  added_at: Date;
  added_by: AddedBy;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

interface AddedBy {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: AddedByType;
  uri: string;
  name: string;
}

interface ExternalUrls {
  spotify: string;
}

type AddedByType = "user" | "artist";

type Artists = AddedBy;

interface Track {
  album: Album;
  artists: Artists[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track: boolean;
  track_number: number;
  type: TrackType;
  uri: string;
}

interface Album {
  album_type: AlbumTypeEnum;
  artists: Artists[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

type AlbumTypeEnum = "compilation" | "single" | "album";

interface Image {
  height: number;
  url: string;
  width: number;
}

type ReleaseDatePrecision = "day";

interface ExternalIDS {
  isrc: string;
}

type TrackType = "track";

interface VideoThumbnail {
  url: null;
}
