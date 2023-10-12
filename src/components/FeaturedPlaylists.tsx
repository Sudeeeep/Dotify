import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { User } from "./User";
import { useFetchFeaturedPlaylists } from "../hooks/useFetchFeaturedPlaylists";

export const FeaturedPlaylists = ({ home }: { home?: boolean }) => {
  const { dispatch } = useContext(StateContext);
  const { featuredPlaylist, loading, error } = useFetchFeaturedPlaylists();

  if (loading) {
    return (
      <div className={home ? "" : `col-span-3`}>
        {!home && <User />}
        <div
          className={
            home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
          }
        >
          <div className="flex justify-between mb-4">
            <p className="text-xl">{featuredPlaylist?.message}</p>
            {home && <div className="cursor-pointer">Show more</div>}
          </div>
          <div className="grid grid-cols-4 gap-6 mb-10">
            {new Array(8).fill("").map((_, index) => (
              <div
                key={index}
                className="py-6 rounded-lg bg-[#121212] cursor-pointer"
              >
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    <div className="w-44 h-44 rounded-lg bg-[#2d2d2d]" />
                  </div>
                  <div className="w-44 p-4 flex flex-col gap-1 bg-[#2d2d2d]"></div>
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
      <div className={home ? "" : `col-span-3`}>
        {!home && <User />}
        <div
          className={
            home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
          }
        >
          <div className="flex justify-between mb-4">
            <p className="text-xl">{featuredPlaylist?.message}</p>
            {home && <div className="cursor-pointer">Show more</div>}
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

  if (featuredPlaylist) {
    return (
      <div className={home ? "" : `col-span-3`}>
        {!home && <User />}
        <div
          className={
            home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
          }
        >
          <div className="flex justify-between mb-4">
            <p className="text-xl">{featuredPlaylist?.message}</p>
            {home && (
              <Link to={"/featured-playlists"} className="cursor-pointer">
                Show more
              </Link>
            )}
          </div>
          <div className="grid grid-cols-4 gap-6 mb-10">
            {(home
              ? featuredPlaylist.playlists.slice(0, 8)
              : featuredPlaylist.playlists
            ).map((item, index) => (
              <Link
                to={`/playlist/${item.id}`}
                key={index}
                className="py-6 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
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
                      className="w-44 h-44 rounded-lg"
                    />
                  </div>
                  <div className="w-44 flex flex-col gap-1 ">
                    <p className="text-lg hover:underline">{item.name}</p>
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
  }
};
