import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { User } from "./User";
import { useFetchPlaylists } from "../hooks/useFetchPlaylists";

export const YourPlaylists = ({ home }: { home?: boolean }) => {
  const { dispatch } = useContext(StateContext);

  const { playlists, loading, error } = useFetchPlaylists();

  if (loading) {
    return (
      <div
        className={
          home ? "" : `col-start-1 row-start-1 col-span-4 lg:col-start-2`
        }
      >
        {!home && <User />}
        <div
          className={home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto`}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="sm:text-xl">Your Playlists</p>
            {home && (
              <div className="cursor-pointer text-sm sm:text-md">Show more</div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {new Array(8).fill("").map((_, index) => (
              <div
                key={index}
                className="py-6 rounded-lg bg-[#121212] cursor-pointer"
              >
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    <div className="w-[6rem] h-[6rem] min-[350px]:w-28 min-[350px]:h-28 min-[420px]:w-36 min-[420px]:h-36 min-[500px]:w-44 min-[500px]:h-44 rounded-lg bg-[#2d2d2d]" />
                  </div>
                  <div className="w-28 min-[500px]:w-44 p-4 bg-[#2d2d2d]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={
          home ? "" : `col-start-1 row-start-1 col-span-4 lg:col-start-2`
        }
      >
        {!home && <User />}
        <div
          className={
            home ? " mb-4" : `h-[75vh] max-h-full px-8 py-4 overflow-auto`
          }
        >
          <div className="flex justify-between items-center mb-4">
            <p className="sm:text-xl">Your Playlists</p>
            {home && <div className="text-sm sm:text-md">Show more</div>}
          </div>
          <div className="flex flex-col justify-center h-[60vh] overflow-auto rounded-lg  bg-[#121212]">
            <p className="text-center">
              Ooops! Something went wrong! Please try logging in again
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        home ? "" : `col-start-1 row-start-1 col-span-4 lg:col-start-2`
      }
    >
      {!home && <User />}
      <div
        className={
          home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
        }
      >
        <div className="flex justify-between items-center mb-4">
          <p className="sm:text-xl">Your Playlists</p>
          {home && (
            <Link
              to={"/your-playlists"}
              className="cursor-pointer text-sm sm:text-md"
            >
              Show more
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {playlists &&
            (home ? playlists.slice(0, 8) : playlists).map((item, index) => (
              <Link
                to={`/playlist/${item.id}`}
                key={index}
                className="py-4 xl:py-6 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
                onClick={() => {
                  dispatch({
                    type: "SET_SELECTED_PLAYLIST",
                    payload: `${item.id}`,
                  });
                  dispatch({ type: "RESET_TRACKS" });
                  dispatch({ type: "SET_TRACK_OFFSET", payload: 0 });
                }}
              >
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-[6rem] min-[350px]:w-28 min-[420px]:w-36 min-[500px]:w-44 rounded-lg"
                    />
                  </div>
                  <div className="w-[6rem] min-[350px]:w-28 min-[500px]:w-44 flex flex-col gap-1">
                    <p className="text-md lg:text-lg hover:underline line-clamp-2">
                      {item.name}
                    </p>
                    <p className="line-clamp-2 text-xs text-[#858383]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
