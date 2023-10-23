import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { useFetchSearchedTracks } from "../hooks/useFetchSearchedTracks";

export const SearchedTracks = () => {
  const { dispatch } = useContext(StateContext);

  const { searchedTracks, loading, error } = useFetchSearchedTracks();

  if (loading) {
    return (
      <div>
        <h1 className="text-xl mb-4">Songs</h1>
        <div>
          {new Array(6).fill("").map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1rem_1fr_4rem] sm:grid-cols-[1rem_1fr_1fr_4rem] gap-4 p-1"
            >
              <div>{index + 1}</div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#121212]"></div>
                <div className="flex flex-col gap-1">
                  <div className="bg-[#A7A7A7] p-2 w-28  min-[400px]:w-40"></div>
                  <div className="bg-[#A7A7A7] p-1 w-16"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="bg-[#A7A7A7] p-2 w-40"></div>
              </div>
              <div>
                <div className="bg-[#A7A7A7] p-2 w-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <div className="mb-10">
            <div className="flex flex-col justify-center h-[35vh]  rounded-lg  bg-[#121212]">
              <p className="text-center">
                Ooops! Something went wrong! Please try logging in again
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl mb-4">Songs</h1>
      <div>
        {searchedTracks &&
          searchedTracks.slice(0, 6).map((track, index) => (
            <div
              key={index}
              className="grid grid-cols-[1rem_1fr_4rem] sm:grid-cols-[1rem_1fr_1fr_4rem] gap-4 p-1 hover:opacity-80 hover:bg-[#2d2d2d]"
            >
              <div>{index + 1}</div>
              <div className="flex gap-3">
                <img
                  src={track.albumImage}
                  alt={track.trackName}
                  className="w-8 h-8 cursor-pointer"
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
                  <div className="text-sm text-[#858383] line-clamp-1">
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

              <div>{track.duration}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
