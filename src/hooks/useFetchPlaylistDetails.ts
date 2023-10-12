import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { useParams } from "react-router-dom";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { PlaylistDetailsResponse } from "../types/ResponseTypes/PlaylistDetailsResponse";

export const useFetchPlaylistDetails = () => {
  const {
    state: { token, selectedPlaylistId, selectedPlaylistDetails },
    dispatch,
  } = useContext(StateContext);

  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const playlistId = useParams().playlistId;

  //fetch selected playlist details
  useEffect(() => {
    checkTokenExpiry(dispatch);
    setDetailsLoading(true);

    if (playlistId) {
      dispatch({
        type: "SET_SELECTED_PLAYLIST",
        payload: `${playlistId}`,
      });
      dispatch({ type: "RESET_TRACKS" });
      dispatch({ type: "SET_TRACK_OFFSET", payload: 0 });
    }

    if (selectedPlaylistId) {
      axios
        .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }: { data: PlaylistDetailsResponse }) => {
          setDetailsError(false);
          const playlistDetails = {
            name: data.name,
            id: data.id,
            description: data.description,
            followers: data.followers.total,
            url: data.images[0].url,
            ownerName: data.owner.display_name,
            total: data.tracks.total,
            uri: data.uri,
          };

          dispatch({
            type: "SET_SELECTED_PLAYLIST_DETAILS",
            payload: playlistDetails,
          });
        })
        .catch(() => {
          setDetailsError(true);
        })
        .finally(() => {
          setDetailsLoading(false);
        });
    }
  }, [selectedPlaylistId, playlistId]);

  return { selectedPlaylistDetails, detailsLoading, detailsError };
};
