import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedAlbumsResponse } from "../types/ResponseTypes/SearchedAlbumsResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchSearchedAlbums = () => {
  const {
    state: { token, searchTerm, searchedAlbums },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=album`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedAlbumsResponse }) => {
        setError(false);
        const albums = data.albums.items.map((item) => {
          return {
            albumId: item.id,
            albumName: item.name,
            type: item.album_type,
            releaseDate: item.release_date,
            albumImg: item.images[0].url,
          };
        });

        dispatch({ type: "SET_SEARCHED_ALBUMS", payload: albums });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return { searchedAlbums, loading, error };
};
