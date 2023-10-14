import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { msConvert } from "../helpers/msConvert";
import { useParams } from "react-router-dom";
import { ArtistTracksResponse } from "../types/ResponseTypes/ArtistTracksResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchArtistTracks = () => {
  const {
    state: { token, user, selectedArtistId, selectedArtistTracks },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const artistId = useParams().artistId;

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    if (artistId) {
      dispatch({ type: "SET_SELECTED_ARTIST", payload: artistId });
    }
    if (selectedArtistId && user) {
      axios
        .get(
          `https://api.spotify.com/v1/artists/${selectedArtistId}/top-tracks?country=${user.country}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }: { data: ArtistTracksResponse }) => {
          setError(false);
          const artistTracks = data.tracks.map((item) => {
            return {
              id: item.id,
              trackName: item.name,
              uri: item.uri,
              albumId: item.album.id,
              albumName: item.album.name,
              albumImage: item.album.images[0]?.url,
              duration: msConvert(item.duration_ms),
            };
          });

          dispatch({
            type: "SET_ARTIST_TRACKS",
            payload: artistTracks,
          });
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedArtistId, artistId, user]);

  return { selectedArtistTracks, loading, error };
};
