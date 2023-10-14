import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { useParams } from "react-router-dom";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { RelatedArtistsResponse } from "../types/ResponseTypes/RelatedArtistResponse";

export const useFetchRelatedArtists = () => {
  const {
    state: { token, selectedArtistId, relatedArtists },
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
    if (selectedArtistId) {
      axios
        .get(
          `https://api.spotify.com/v1/artists/${selectedArtistId}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }: { data: RelatedArtistsResponse }) => {
          setError(false);
          const artistDetails = data.artists.map((item) => {
            return {
              artistId: item.id,
              artistName: item.name,
              artistImg: item.images[0].url,
            };
          });
          dispatch({ type: "SET_RELATED_ARTISTS", payload: artistDetails });
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedArtistId, artistId]);

  return { selectedArtistId, relatedArtists, loading, error };
};
