import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { changeDateFormat } from "../helpers/changeDateFormat";
import { msConvert } from "../helpers/msConvert";
import { Tracks } from "../context/reducer";
import { PlaylistTracksResponse } from "../types/ResponseTypes/PlaylistTracksResponse";
import axios from "axios";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchPlaylistTracks = () => {
  const {
    state: { token, selectedPlaylistId, tracks, trackOffset },
    dispatch,
  } = useContext(StateContext);

  const [tracksLoading, setTracksLoading] = useState(true);
  const [tracksError, setTracksError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setTracksLoading(true);
    if (selectedPlaylistId) {
      axios
        .get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks?offset=${trackOffset}&limit=20&fields=items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }: { data: PlaylistTracksResponse }) => {
          setTracksError(false);
          const newData = data.items.map(({ added_at, track }) => {
            return { added_at: added_at.toString().slice(0, 10), track };
          });

          const fetchedtracks = newData.map<Tracks>((item) => {
            return {
              id: item.track.id,
              trackName: item.track.name,
              uri: item.track.uri,
              albumName: item.track.album.name,
              albumId: item.track.album.id,
              albumImage: item.track.album.images[0]?.url,
              dateAdded: changeDateFormat(new Date(item.added_at).toString()),
              duration: msConvert(item.track.duration_ms),
              artists: item.track.album.artists.map(
                ({
                  id,
                  name,
                  uri,
                }: {
                  id: string;
                  name: string;
                  uri: string;
                }) => {
                  return { id, name, uri };
                }
              ),
            };
          });
          dispatch({ type: "SET_TRACKS", payload: fetchedtracks });
        })
        .catch(() => {
          setTracksError(true);
        })
        .finally(() => {
          setTracksLoading(false);
        });
    }
  }, [selectedPlaylistId, trackOffset]);

  return { tracks, trackOffset, tracksLoading, tracksError };
};
