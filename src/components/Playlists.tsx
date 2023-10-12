import { useContext } from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { useFetchPlaylists } from "../hooks/useFetchPlaylists";

export const Playlists = () => {
  const { dispatch } = useContext(StateContext);

  const { playlists, selectedPlaylistId, loading, error } = useFetchPlaylists();

  if (loading) {
    console.log(new Array(5).fill(""));
    return (
      <div className="bg-[#121212] m-2 rounded-lg p-3">
        <div className="flex gap-2 text-xl text-[#A7A7A7] hover:text-white mb-4 cursor-pointer">
          <BiSolidPlaylist />
          <span>Your Library</span>
        </div>
        <div className="flex flex-col gap-1 max-h-full h-[60vh] overflow-auto">
          {new Array(7).fill("").map((_, index) => (
            <div key={index}>
              <div className="flex gap-10 cursor-pointer p-2">
                <div className="w-10 h-10 bg-[#A7A7A7]" />
                <div className="h-3 w-1/2 bg-[#A7A7A7]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#121212] m-2 rounded-lg p-3">
        <div className="flex gap-2 text-xl text-[#A7A7A7] hover:text-white mb-4 cursor-pointer">
          <BiSolidPlaylist />
          <span>Your Library</span>
        </div>
        <div className="flex flex-col justify-center h-[60vh] overflow-auto">
          <p className="text-center">
            Ooops! Something went wrong! Please try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] m-2 rounded-lg p-3">
      <div className="flex gap-2 text-xl text-[#A7A7A7] hover:text-white mb-4 cursor-pointer">
        <BiSolidPlaylist />
        <span>Your Library</span>
      </div>
      <div className="flex flex-col gap-1 max-h-full h-[60vh] overflow-auto">
        {playlists &&
          playlists.map(({ id, name, url }, index) => (
            <Link to={`/playlist/${id}`} key={index}>
              <div
                className="flex gap-2 cursor-pointer p-2 hover:bg-[#2d2d2d]"
                onClick={() => {
                  if (selectedPlaylistId !== id) {
                    dispatch({
                      type: "SET_SELECTED_PLAYLIST",
                      payload: `${id}`,
                    });
                    dispatch({ type: "RESET_TRACKS" });
                    dispatch({ type: "SET_TRACK_OFFSET", payload: 0 });
                  }
                }}
              >
                <img src={url} alt={name} className="w-10 h-10" />
                <p>{name}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
