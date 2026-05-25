import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { useParams } from "react-router-dom";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { ArtistDetailsResponse } from "../types/ResponseTypes/ArtistDetailsResponse";
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

    const id = artistId ?? selectedArtistId;
    if (!id) return;

    if (artistId) {
      dispatch({ type: "SET_SELECTED_ARTIST", payload: artistId });
    }

    setLoading(true);

    axios
      .get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }: { data: ArtistDetailsResponse }) => {
        const query = data.genres[0] ?? data.name;
        return axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=20`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
      .then((response) => {
        if (!response) return;
        const { data }: { data: RelatedArtistsResponse } = response;
        const artists = data.artists.items
          .filter((item) => item.id !== id)
          .slice(0, 10)
          .map((item) => ({
            artistId: item.id,
            artistName: item.name,
            artistImg: item.images[0]?.url ?? "",
          }));
        dispatch({ type: "SET_RELATED_ARTISTS", payload: artists });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [selectedArtistId, artistId]);

  return { selectedArtistId, relatedArtists, loading, error };
};
