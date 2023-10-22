import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { User } from "./User";
import { useFetchPlaylistDetails } from "../hooks/useFetchPlaylistDetails";
import { useFetchPlaylistTracks } from "../hooks/useFetchPlaylistTracks";

export const PlaylistDetails = () => {
  const { dispatch } = useContext(StateContext);
  const { selectedPlaylistDetails, detailsLoading, detailsError } =
    useFetchPlaylistDetails();
  const { tracks, trackOffset, tracksError } = useFetchPlaylistTracks();

  if (detailsLoading) {
    return (
      <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2 overflow-hidden">
        <User />
        <div className="h-[75vh] max-h-full overflow-auto">
          {/* Playlist Header */}
          <div className="flex gap-4 items-end m-6">
            <div className="w-32 h-32 min-[450px]:w-36 min-[450px]:h-36 min-[540px]:w-44 min-[540px]:h-44 sm:w-56 sm:h-56 bg-[#121212]" />
            <div className="w-[75%] flex flex-col gap-4">
              <div className="p-10 bg-[#A7A7A7]"></div>
              <div>
                <div className="w-[75%] p-3 mb-1 bg-[#A7A7A7]"></div>
                <div className="w-1/2 p-2 bg-[#A7A7A7]"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-6 text-[#858383]">
            <div className="grid grid-cols-[1rem_1fr_3rem] sm:grid-cols-[1rem_1fr_1fr_6rem] min-[730px]:grid-cols-[1rem_1fr_1fr_8rem_6rem] gap-4 px-4 border-b">
              <div>#</div>
              <div>Title</div>
              <div className="hidden sm:block">Album</div>
              <div className="hidden min-[730px]:block">Date added</div>
              <div>Duration</div>
            </div>
            {new Array(3).fill("").map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[1rem_1fr_3rem] sm:grid-cols-[1rem_1fr_1fr_6rem] min-[730px]:grid-cols-[1rem_1fr_1fr_8rem_6rem] gap-4 p-4 hover:opacity-80 hover:bg-[#2d2d2d]"
              >
                <div>{index + 1}</div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 cursor-pointer bg-[#121212]"></div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#A7A7A7] p-2 w-28 min-[400px]:w-40"></div>
                    <div className="bg-[#A7A7A7] p-1 w-16"></div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="bg-[#A7A7A7] p-2 w-40 hidden sm:block"></div>
                </div>
                <div className="hidden min-[730px]:block">
                  <div className="bg-[#A7A7A7] p-2 w-16"></div>
                </div>
                <div>
                  <div className="bg-[#A7A7A7] p-2 w-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (detailsError || tracksError) {
    return (
      <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2">
        <User />
        <div className="h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3">
          <div className="mb-10">
            <div className="flex flex-col justify-center h-[75vh] overflow-auto rounded-lg  bg-[#121212]">
              <p className="text-center">
                Ooops! Something went wrong! Please try logging in again
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPlaylistDetails && tracks.length !== 0) {
    return (
      <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2 overflow-hidden">
        <User />
        <div className="h-[75vh] max-h-full overflow-auto">
          {/* Playlist Header */}
          <div className="flex gap-4 items-end m-6">
            <img
              src={selectedPlaylistDetails?.url}
              alt="playlist thumbnail"
              className="w-32 min-[450px]:w-36 min-[540px]:w-44 sm:w-56"
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-xl min-[450px]:text-3xl min-[540px]:text-4xl min-[730px]:text-6xl sm:text-5xl font-bold line-clamp-2">
                {selectedPlaylistDetails?.name}
              </h1>
              <div>
                <p className="text-xs min-[500px]:text-sm mb-1 text-[#D3D4D6] line-clamp-2">
                  {selectedPlaylistDetails?.description}
                </p>
                <ul className="list-disc flex gap-6 text-[0.5rem] min-[400px]:text-xs min-[500px]:text-sm sm:text-base">
                  <p>{selectedPlaylistDetails?.ownerName}</p>
                  <li>{selectedPlaylistDetails?.followers} likes</li>
                  <li>{selectedPlaylistDetails?.total} songs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="">
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
              <div className="grid grid-cols-[1rem_1fr_3rem] sm:grid-cols-[1rem_1fr_1fr_6rem] min-[730px]:grid-cols-[1rem_1fr_1fr_8rem_6rem] gap-4 px-4 border-b">
                <div>#</div>
                <div>Title</div>
                <div className="hidden sm:block">Album</div>
                <div className="hidden min-[730px]:block">Date added</div>
                <div>Duration</div>
              </div>
              {tracks &&
                tracks.map((track, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1rem_1fr_3rem] sm:grid-cols-[1rem_1fr_1fr_6rem] min-[730px]:grid-cols-[1rem_1fr_1fr_8rem_6rem] gap-4 p-4 hover:opacity-80 hover:bg-[#2d2d2d]"
                  >
                    <div>{index + 1}</div>
                    <div className="flex gap-4">
                      <img
                        src={track.albumImage}
                        alt={track.trackName}
                        className="w-8 h-8 min-[450px]:w-10 min-[450px]:h-10 cursor-pointer"
                        onClick={() =>
                          dispatch({
                            type: "SET_PLAYER_URIS",
                            payload: [track.uri],
                          })
                        }
                      />
                      <div className="flex flex-col">
                        <p
                          className="text-white hover:underline cursor-pointer line-clamp-2"
                          onClick={() =>
                            dispatch({
                              type: "SET_PLAYER_URIS",
                              payload: [track.uri],
                            })
                          }
                        >
                          {track.trackName}
                        </p>
                        <div className="text-sm line-clamp-1">
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
                      className="hidden sm:block hover:underline cursor-pointer line-clamp-1"
                    >
                      {track.albumName}
                    </Link>
                    <div className="hidden min-[730px]:block">
                      {track.dateAdded}
                    </div>
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
