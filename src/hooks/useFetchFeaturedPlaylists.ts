import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";
import axios from "axios";
import { FeaturedPlaylistsResponse } from "../types/ResponseTypes/FeaturedPlaylistsResponse";
import { FeaturedPlaylistsType } from "../context/reducer";

export const useFetchFeaturedPlaylists = () => {
  const {
    state: { token, user, featuredPlaylist },
    dispatch,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    setError(false);
    setLoading(true);
    if (user?.country) {
      axios
        .get(
          `https://api.spotify.com/v1/browse/featured-playlists?country=${user?.country}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }: { data: FeaturedPlaylistsResponse }) => {
          const playlistDetails: FeaturedPlaylistsType = {
            message: data.message,
            playlists: data.playlists.items.map(
              ({ id, name, description, images, uri }) => {
                return {
                  id,
                  name,
                  url: images[0].url,
                  description,
                  uri,
                };
              }
            ),
          };
          dispatch({
            type: "SET_FEATURED_PLAYLISTS",
            payload: playlistDetails,
          });
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.country]);

  return { featuredPlaylist, loading, error };
};
