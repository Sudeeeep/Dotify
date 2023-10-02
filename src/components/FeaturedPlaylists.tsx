import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { FeaturedPlaylistsType } from "../context/reducer";
import { RiPlayFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { User } from "./User";

export const FeaturedPlaylists = ({ home }: { home?: boolean }) => {
  const {
    state: { token, user, featuredPlaylist },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    if (user?.country) {
      axios
        .get(
          `https://api.spotify.com/v1/browse/featured-playlists?country=${user?.country}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          const playlistDetails: FeaturedPlaylistsType = {
            message: data.message,
            playlists: data.playlists.items.map(
              ({
                id,
                name,
                description,
                images,
              }: {
                id: string;
                name: string;
                description: string;
                images: [{ url: string }];
              }) => {
                return {
                  id,
                  name,
                  url: images[0].url,
                  description,
                };
              }
            ),
          };
          console.log(playlistDetails);
          dispatch({
            type: "SET_FEATURED_PLAYLISTS",
            payload: playlistDetails,
          });
        });
    }
  }, [user?.country]);

  console.log(home);

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
                  <div className="relative">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-44 h-44 rounded-lg"
                    />
                    <div className="absolute bottom-0 right-0 text-[black] bg-[#1ED760] p-2 m-1 rounded-full cursor-pointer hover:scale-105">
                      <RiPlayFill className="w-8 h-8" />
                    </div>
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
