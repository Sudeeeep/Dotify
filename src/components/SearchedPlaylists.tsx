import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { useFetchSearchedPlaylists } from "../hooks/useFetchSearchedPlaylists";

export const SearchedPlaylists = () => {
  const { dispatch } = useContext(StateContext);

  const { searchedPlaylists, loading, error } = useFetchSearchedPlaylists();

  if (loading) {
    return (
      <div>
        <h1 className="text-xl mb-4">Playlists</h1>
        <div className="grid grid-cols-2 min-[500px]:grid-cols-3 min-[770px]:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
          {new Array(5).fill("").map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-4 rounded-lg bg-[#121212] hover:bg-[#2d2d2d]"
            >
              <div className="self-center">
                <div className="w-[6rem] h-[6rem] min-[600px]:w-36 min-[600px]:h-36 bg-[#2d2d2d] rounded-lg"></div>
              </div>
              <div>
                <div className="p-4 bg-[#2d2d2d]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-6">
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
      <h1 className="text-xl mb-4">Playlists</h1>
      <div className="grid grid-cols-2 min-[500px]:grid-cols-3 min-[770px]:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
        {searchedPlaylists &&
          searchedPlaylists.slice(0, 5).map((item, index) => (
            <Link
              to={`/playlist/${item.id}`}
              key={index}
              className="flex flex-col gap-4 py-6 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
              onClick={() => {
                dispatch({
                  type: "SET_SELECTED_PLAYLIST",
                  payload: `${item.id}`,
                });
                dispatch({ type: "RESET_TRACKS" });
                dispatch({ type: "SET_TRACK_OFFSET", payload: 0 });
              }}
            >
              <div className="self-center">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-[6rem] h-[6rem] min-[600px]:w-36 min-[600px]:h-36 rounded-lg  cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2 px-4">
                <p className="min-[500px]:text-lg line-clamp-2 hover:underline">
                  {item.name}
                </p>
                <p className="line-clamp-2 text-xs text-[#858383]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
