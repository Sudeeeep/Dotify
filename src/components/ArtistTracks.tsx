import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { useFetchArtistTracks } from "../hooks/useFetchArtistTracks";

export const ArtistTracks = () => {
  const { dispatch } = useContext(StateContext);

  const { selectedArtistTracks, loading, error } = useFetchArtistTracks();

  if (loading) {
    return (
      <div className="mx-6 my-10">
        <div>
          {new Array(4).fill("").map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1rem_1fr_1fr_8rem] gap-4 p-4 hover:opacity-80 hover:bg-[#2d2d2d]"
            >
              <div>{index + 1}</div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#121212] cursor-pointer"></div>
                <div>
                  <p className="bg-[#A7A7A7] p-2 w-48"></p>
                </div>
              </div>
              <div>
                <p className="bg-[#A7A7A7] p-2 w-48"></p>
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
      <div className="px-8 py-4 col-span-3">
        <div>
          <div className="flex flex-col justify-center h-[45vh] rounded-lg bg-[#121212]">
            <p className="text-center">
              Ooops! Something went wrong! Please try logging in again
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex gap-4">
              <img
                src={track.albumImage}
                alt={track.trackName}
                className="w-10 h-10 cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "SET_PLAYER_URIS",
                    payload: [track.uri],
                  })
                }
              />
              <p
                className="hover:underline cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "SET_PLAYER_URIS",
                    payload: [track.uri],
                  })
                }
              >
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
