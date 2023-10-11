import axios from "axios";
import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { msConvert } from "../helpers/msConvert";
import { Link, useParams } from "react-router-dom";
import { ArtistTracksResponse } from "../types/ResponseTypes/ArtistTracksResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const ArtistTracks = () => {
  const {
    state: { token, user, selectedArtistId, selectedArtistTracks },
    dispatch,
  } = useContext(StateContext);

  const artistId = useParams().artistId;

  useEffect(() => {
    checkTokenExpiry(dispatch);
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

          console.log(artistTracks);
          dispatch({
            type: "SET_ARTIST_TRACKS",
            payload: artistTracks,
          });
        });
    }
  }, [selectedArtistId, artistId, user]);

  console.log(selectedArtistTracks);

  return (
    <div className="mx-6 my-10">
      <h1 className="text-2xl">Popular</h1>
      <div>
        {selectedArtistTracks.map((track, index) => (
          <div
            key={index}
            className="grid grid-cols-[1rem_1fr_1fr_8rem] gap-4 p-4 hover:opacity-80 hover:bg-[#2d2d2d]"
          >
            <div>{index + 1}</div>
            <div className="flex gap-2">
              <img
                src={track.albumImage}
                alt={track.trackName}
                className="w-10 h-10"
              />
              <p className="hover:underline cursor-pointer">
                {track.trackName}
              </p>
            </div>
            <div>
              <Link
                to={`/album/${track.albumId}`}
                className="hover:underline cursor-pointer w-fit"
              >
                {track.albumName}
              </Link>
            </div>
            <div>{track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
