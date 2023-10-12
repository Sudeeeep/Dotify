import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { TopArtistsResponse } from "../types/ResponseTypes/TopArtistsResponse";

export const useFetchTopArtists = () => {
  const {
    state: { token, favouriteArtists },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: TopArtistsResponse }) => {
        setError(false);
        const artistDetails = data.items.map((item) => {
          return {
            artistId: item.id,
            artistName: item.name,
            artistImg: item.images[0].url,
          };
        });
        dispatch({ type: "SET_FAVOURITE_ARTISTS", payload: artistDetails });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { favouriteArtists, loading, error };
};
