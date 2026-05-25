interface Artist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  genres: string[];
  uri: string;
}

interface Artists {
  items: Artist[];
}

export interface RelatedArtistsResponse {
  artists: Artists;
}
