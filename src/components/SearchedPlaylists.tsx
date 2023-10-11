import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedPlaylistsResponse } from "../types/ResponseTypes/SearchedPlaylistsResponse";
import { Link } from "react-router-dom";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const SearchedPlaylists = () => {
  const {
    state: { token, searchTerm, searchedPlaylists },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=playlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedPlaylistsResponse }) => {
        console.log(data);
        const playlists = data.playlists.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            url: item.images[0].url,
            description: item.description,
          };
        });
        dispatch({ type: "SET_SEARCHED_PLAYLISTS", payload: playlists });
      });
  }, [searchTerm]);

  console.log(searchedPlaylists);

  if (searchedPlaylists) {
    return (
      <div>
        <h1>Playlists</h1>
        <div className="grid grid-cols-5 gap-6 mb-10">
          {searchedPlaylists.slice(0, 5).map((item, index) => (
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
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-36 h-36 rounded-lg  cursor-pointer"
                />

                <div className="w-44 flex flex-col gap-1 px-4">
                  <p className="text-lg hover:underline line-clamp-1">
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
    );
  }
};
