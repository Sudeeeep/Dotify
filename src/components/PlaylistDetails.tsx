import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { User } from "./User";
import { changeDateFormat } from "../helpers/changeDateFormat";
import { msConvert } from "../helpers/msConvert";
import { Tracks } from "../context/reducer";
import { PlaylistTracksResponse } from "../types/ResponseTypes/PlaylistTracksResponse";
import { PlaylistDetailsResponse } from "../types/ResponseTypes/PlaylistDetailsResponse";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const PlaylistDetails = () => {
  const {
    state: {
      token,
      selectedPlaylistId,
      selectedPlaylistDetails,
      tracks,
      trackOffset,
    },
    dispatch,
  } = useContext(StateContext);

  const playlistId = useParams().playlistId;

  // console.log(selectedPlaylistId);

  //fetch selected playlist details
  useEffect(() => {
    checkTokenExpiry(dispatch);

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
          console.log(data);
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
          //   console.log(playlistDetails);
          dispatch({
            type: "SET_SELECTED_PLAYLIST_DETAILS",
            payload: playlistDetails,
          });
        });
    }
  }, [selectedPlaylistId, playlistId]);

  //fetch the tracks in the selected playlist
  useEffect(() => {
    checkTokenExpiry(dispatch);
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
          // console.log(fetchedtracks);
          dispatch({ type: "SET_TRACKS", payload: fetchedtracks });
        });
    }
  }, [selectedPlaylistId, trackOffset]);

  //   console.log(tracks);
  //   console.log(trackOffset);

  if (selectedPlaylistDetails && tracks.length !== 0) {
    return (
      <div className="col-span-3 overflow-hidden">
        <User />
        <div className="h-[75vh] max-h-full overflow-auto">
          {/* Playlist Header */}
          <div className="flex gap-4 items-end m-6">
            <img
              src={selectedPlaylistDetails?.url}
              alt="playlist thumbnail"
              className="w-56 h-56"
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-bold">
                {selectedPlaylistDetails?.name}
              </h1>
              <div>
                <p className="text-sm mb-1 text-[#D3D4D6]">
                  {selectedPlaylistDetails?.description}
                </p>
                <ul className="list-disc flex gap-6">
                  <p>{selectedPlaylistDetails?.ownerName}</p>
                  <li>{selectedPlaylistDetails?.followers} likes</li>
                  <li>{selectedPlaylistDetails?.total} songs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[]">
            {/* Play/Pause button*/}
            <div
              className="m-4 w-fit"
              onClick={() =>
                dispatch({
                  type: "SET_PLAYER_URIS",
                  payload: [selectedPlaylistDetails.uri],
                })
              }
            >
              <AiFillPlayCircle className="text-[#1ED760] text-6xl cursor-pointer hover:scale-105" />
            </div>

            {/* Tracks in the selected playlist*/}
            <div className="flex flex-col p-6 text-[#858383]">
              <div className="grid grid-cols-[1rem_1fr_1fr_8rem_6rem] gap-4 px-4 border-b">
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div>Date added</div>
                <div>Duration</div>
              </div>
              {tracks &&
                tracks.map((track, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1rem_1fr_1fr_8rem_6rem] gap-4 p-4 hover:opacity-80 hover:bg-[#2d2d2d]"
                  >
                    <div>{index + 1}</div>
                    <div className="flex gap-4">
                      <img
                        src={track.albumImage}
                        alt={track.trackName}
                        className="w-10 h-10"
                      />
                      <div className="flex flex-col">
                        <p className="text-white hover:underline cursor-pointer">
                          {track.trackName}
                        </p>
                        <div className="text-sm">
                          {track.artists.length > 1
                            ? track.artists.map((artist, index) => {
                                return index === track.artists.length - 1 ? (
                                  <Link
                                    to={`/artist/${artist.id}`}
                                    key={index}
                                    className="hover:underline cursor-pointer"
                                  >
                                    {artist.name}
                                  </Link>
                                ) : (
                                  <Link
                                    to={`/artist/${artist.id}`}
                                    key={index}
                                    className="hover:underline cursor-pointer"
                                  >
                                    {artist.name + ", "}
                                  </Link>
                                );
                              })
                            : track.artists.map((artist) => (
                                <Link
                                  to={`/artist/${artist.id}`}
                                  key={index}
                                  className="hover:underline cursor-pointer"
                                >
                                  {artist.name}
                                </Link>
                              ))}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/album/${track.albumId}`}
                      className="hover:underline cursor-pointer"
                    >
                      {track.albumName}
                    </Link>
                    <div>{track.dateAdded}</div>
                    <div>{track.duration}</div>
                  </div>
                ))}
            </div>

            {tracks.length < selectedPlaylistDetails.total && (
              <div className="text-center">
                <button
                  className="bg-[white] text-black px-6 py-3 rounded-full"
                  onClick={() =>
                    dispatch({
                      type: "SET_TRACK_OFFSET",
                      payload: trackOffset + 20,
                    })
                  }
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};
