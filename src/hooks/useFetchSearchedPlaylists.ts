import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedPlaylistsResponse } from "../types/ResponseTypes/SearchedPlaylistsResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchSearchedPlaylists = () => {
  const {
    state: { token, searchTerm, searchedPlaylists },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=playlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedPlaylistsResponse }) => {
        setError(false);
        const playlists = data.playlists.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            url: item.images[0].url,
            description: item.description,
            uri: item.uri,
          };
        });
        dispatch({ type: "SET_SEARCHED_PLAYLISTS", payload: playlists });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return { searchedPlaylists, loading, error };
};
