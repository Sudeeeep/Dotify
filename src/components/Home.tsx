import axios from "axios";
import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { FeaturedPlaylists } from "../context/reducer";
import { RiPlayFill } from "react-icons/ri";

export const Home = () => {
  const {
    state: { token, user, featuredPlaylist, playlists },
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
          const playlistDetails: FeaturedPlaylists = {
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

  if (featuredPlaylist && playlists) {
    return (
      <div className="overflow-hidden">
        <div className="h-[75vh] p-8 overflow-auto">
          {/* Featured Playlists */}
          <div className="flex justify-between mb-4">
            <p className="text-xl">{featuredPlaylist?.message}</p>
            <p className="cursor-pointer">Show more</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {featuredPlaylist?.playlists.slice(0, 8).map((item, index) => (
              <div
                key={index}
                className="py-6 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "SET_SELECTED_PLAYLIST",
                    payload: `${item.id}`,
                  })
                }
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
                    <p className="text-lg">{item.name}</p>
                    <p className="line-clamp-2 text-xs text-[#858383]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Your Playlists */}
          <div className="flex justify-between mt-12 mb-4">
            <p className="text-xl">Your Playlists</p>
            <p className="cursor-pointer">Show more</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {playlists?.slice(0, 8).map((item, index) => (
              <div
                key={index}
                className="py-6 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "SET_SELECTED_PLAYLIST",
                    payload: `${item.id}`,
                  })
                }
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
                  <div className="w-44 flex flex-col gap-1">
                    <p className="text-lg">{item.name}</p>
                    <p className="line-clamp-2 text-xs text-[#858383]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
