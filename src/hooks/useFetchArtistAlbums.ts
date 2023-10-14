import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import axios from "axios";

import { ArtistAlbumsResponse } from "../types/ResponseTypes/ArtistAlbumsResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchArtistAlbums = () => {
  const {
    state: { token, user, selectedArtistId, artistAlbums },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
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
        .get(`https://api.spotify.com/v1/artists/${selectedArtistId}/albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }: { data: ArtistAlbumsResponse }) => {
          setError(false);
          const albums = data.items.map((item) => {
            return {
              albumId: item.id,
              albumName: item.name,
              type: item.album_type,
              releaseDate: item.release_date,
              albumImg: item.images[0].url,
            };
          });

          dispatch({ type: "SET_ALBUMS", payload: albums });
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedArtistId, artistId, user]);

  return { artistAlbums, selectedArtistId, loading, error };
};
