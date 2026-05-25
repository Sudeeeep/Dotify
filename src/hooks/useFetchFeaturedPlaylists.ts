import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { FeaturedPlaylistsResponse } from "../types/ResponseTypes/FeaturedPlaylistsResponse";

export const useFetchFeaturedPlaylists = () => {
  const {
    state: { token, featuredPlaylist },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    checkTokenExpiry(dispatch);
    setError(false);
    setLoading(true);

    axios
      .get("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }: { data: FeaturedPlaylistsResponse }) => {
        const seen = new Set<string>();
        const albums = data.items
          .map(({ track }) => track.album)
          .filter(({ id }) => {
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
          })
          .map(({ id, name, images, uri, artists }) => ({
            id,
            name,
            url: images[0]?.url ?? "",
            description: artists.map((a) => a.name).join(", "),
            uri,
          }));

        dispatch({
          type: "SET_FEATURED_PLAYLISTS",
          payload: { message: "Recently Played", playlists: albums },
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  return { featuredPlaylist, loading, error };
};
