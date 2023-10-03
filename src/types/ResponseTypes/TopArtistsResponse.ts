export interface TopArtistsResponse {
  items: Item[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: null;
}

interface Item {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: Type;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: null;
  total: number;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

type Type = "artist";
