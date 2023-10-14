import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { ArtistDetailsResponse } from "../types/ResponseTypes/ArtistDetailsResponse";
import { ArtistDetailsType } from "../context/reducer";
import { useParams } from "react-router-dom";
export const useFetchArtistDetails = () => {
  const {
    state: { token, selectedArtistDetails, selectedArtistId },
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
        .get(`https://api.spotify.com/v1/artists/${selectedArtistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }: { data: ArtistDetailsResponse }) => {
          setError(false);
          const artistDetails: ArtistDetailsType = {
            artistId: data.id,
            artistName: data.name,
            followers: data.followers.total,
            artistImg: data.images[0].url,
            uri: data.uri,
          };
          dispatch({
            type: "SET_SELECTED_ARTIST_DETAILS",
            payload: artistDetails,
          });
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedArtistId, artistId]);

  return { selectedArtistDetails, loading, error };
};
