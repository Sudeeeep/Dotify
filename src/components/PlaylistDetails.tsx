import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";

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

  //fetch selected playlist details
  useEffect(() => {
    if (selectedPlaylistId) {
      axios
        .get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          const playlistDetails = {
            name: res.data.name,
            id: res.data.id,
            description: res.data.description,
            followers: res.data.followers.total,
            url: res.data.images[0].url,
            ownerName: res.data.owner.display_name,
            total: res.data.tracks.total,
          };
          //   console.log(playlistDetails);
          dispatch({
            type: "SET_SELECTED_PLAYLIST_DETAILS",
            payload: playlistDetails,
          });
        });
    }
  }, [selectedPlaylistId]);

  //fetch the tracks in the selected playlist
  useEffect(() => {
    if (selectedPlaylistId) {
      axios
        .get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks?offset=${trackOffset}&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          //   console.log(data.items);
          data = data.items.map(({ added_at, track }) => {
            return { added_at: added_at.slice(0, 10), track };
          });
          //   console.log(data);
          const fetchedtracks = data.map((item) => {
            return {
              id: item.track.id,
              trackName: item.track.name,
              uri: item.track.uri,
              album: item.track.album.name,
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
          console.log(fetchedtracks);
          dispatch({ type: "SET_TRACKS", payload: fetchedtracks });
        });
    }
  }, [selectedPlaylistId, trackOffset]);

  //   console.log(tracks);
  //   console.log(trackOffset);

  function msConvert(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Number(((ms % 60000) / 1000).toFixed(0));
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function changeDateFormat(date: string) {
    const day = date.slice(8, 10);
    const month = date.slice(4, 7);
    const year = date.slice(11, 15);
    return `${day} ${month} ${year}`;
  }

  if (selectedPlaylistDetails && tracks.length !== 0) {
    return (
      <div className="col-span-3 overflow-hidden">
        <div className="h-[80vh] max-h-full overflow-auto">
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
            <div className="m-4">
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
                        <p className="text-white">{track.trackName}</p>
                        <p className="text-sm">
                          {track.artists.length > 1
                            ? track.artists.map((artist, index) => {
                                return index === track.artists.length - 1
                                  ? artist.name
                                  : artist.name + ", ";
                              })
                            : track.artists.map((artist) => artist.name)}
                        </p>
                      </div>
                    </div>
                    <div>{track.album}</div>
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
