import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedArtistsResponse } from "../types/ResponseTypes/SearchedArtistsResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchSearchedArtists = () => {
  const {
    state: { token, searchTerm, searchedArtists },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedArtistsResponse }) => {
        setError(false);
        const artists = data.artists.items.map((item) => {
          return {
            artistId: item.id,
            artistName: item.name,
            artistImg: item.images[0]?.url,
          };
        });

        dispatch({ type: "SET_SEARCHED_ARTISTS", payload: artists });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return { searchedArtists, loading, error };
};
