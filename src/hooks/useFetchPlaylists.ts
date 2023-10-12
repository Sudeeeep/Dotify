import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { PlaylistsResponse } from "../types/ResponseTypes/PlaylistsResponse";

export const useFetchPlaylists = () => {
  const {
    state: { token, playlists, selectedPlaylistId },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    axios
      .get("https://api.spotify.com/v1/me/playlists?fields=items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: PlaylistsResponse }) => {
        setError(false);
        const userPlaylists = data.items.map(
          ({ images: [{ url }], name, id, description, uri }) => {
            return { url, id, name, description, uri };
          }
        );
        dispatch({ type: "SET_PLAYLISTS", payload: userPlaylists });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, dispatch]);

  return { playlists, selectedPlaylistId, loading, error };
};
