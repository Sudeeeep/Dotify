export interface SearchedPlaylistsResponse {
  playlists: Playlists;
}

interface Playlists {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

interface Item {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: null;
  snapshot_id: string;
  tracks: Tracks;
  type: ItemType;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: OwnerType;
  uri: string;
}

type OwnerType = "user";

interface Tracks {
  href: string;
  total: number;
}

type ItemType = "playlist";
