interface Album {
  id: string;
  name: string;
  uri: string;
  images: { url: string; height: number; width: number }[];
  artists: { id: string; name: string }[];
}

interface Track {
  album: Album;
}

interface RecentlyPlayedItem {
  track: Track;
  played_at: string;
}

export interface FeaturedPlaylistsResponse {
  items: RecentlyPlayedItem[];
  next: string | null;
  limit: number;
  href: string;
}
