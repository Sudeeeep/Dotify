import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedTracksResponse } from "../types/ResponseTypes/SearchedTracksResponse";
import { msConvert } from "../helpers/msConvert";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchSearchedTracks = () => {
  const {
    state: { token, searchTerm, searchedTracks },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedTracksResponse }) => {
        setError(false);
        const tracks = data.tracks.items.map((item) => {
          return {
            id: item.id,
            trackName: item.name,
            uri: item.uri,
            albumName: item.album.name,
            albumId: item.album.id,
            albumImage: item.album.images[0]?.url,
            duration: msConvert(item.duration_ms),
            artists: item.album.artists.map(({ id, name, uri }) => {
              return { id, name, uri };
            }),
          };
        });
        dispatch({ type: "SET_SEARCHED_TRACKS", payload: tracks });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return { searchedTracks, loading, error };
};
