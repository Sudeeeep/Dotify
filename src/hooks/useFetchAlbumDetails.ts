import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { msConvert } from "../helpers/msConvert";
import { AlbumDetailsResponse } from "../types/ResponseTypes/AlbumDetailsResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const useFetchAlbumDetails = () => {
  const {
    state: { token, selectedAlbumId, selectedAlbumDetails },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const albumId = useParams().albumId;

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setLoading(true);
    if (albumId) {
      dispatch({
        type: "SET_SELECTED_ALBUM",
        payload: `${albumId}`,
      });
    }

    if (selectedAlbumId) {
      axios
        .get(`https://api.spotify.com/v1/albums/${selectedAlbumId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }: { data: AlbumDetailsResponse }) => {
          const albumDetails = {
            albumId: data.id,
            albumName: data.name,
            type: data.type,
            releaseDate: data.release_date,
            albumImg: data.images[0].url,
            uri: data.uri,
            total: data.tracks.total,
            artists: data.artists.map(({ id, name, uri }) => {
              return { id, name, uri };
            }),
            tracks: data.tracks.items.map((track) => {
              return {
                id: track.id,
                trackName: track.name,
                uri: track.name,
                duration: msConvert(track.duration_ms),
                artists: track.artists.map(({ id, name, uri }) => {
                  return { id, name, uri };
                }),
              };
            }),
          };

          dispatch({
            type: "SET_SELECTED_ALBUM_DETAILS",
            payload: albumDetails,
          });
          if (albumDetails.artists[0].name != "Various Artists") {
            dispatch({
              type: "SET_SELECTED_ARTIST",
              payload: albumDetails.artists[0].id,
            });
            dispatch({
              type: "SET_SELECTED_ARTIST",
              payload: albumDetails.artists[0].id,
            });
          }
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedAlbumId, albumId]);

  return { selectedAlbumDetails, loading, error };
};
