import { useContext, useEffect } from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { PlaylistsType } from "../context/reducer";
import { Link } from "react-router-dom";

export const Playlists = () => {
  const {
    state: { token, playlists, selectedPlaylistId },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const userPlaylists: PlaylistsType[] = data.items.map(
          ({
            images: [{ url }],
            name,
            id,
            description,
          }: {
            images: [{ height: number; url: string; width: number }];
            name: string;
            id: string;
            description: string;
          }) => {
            return { url, id, name, description };
          }
        );
        dispatch({ type: "SET_PLAYLISTS", payload: userPlaylists });
      });
  }, [token, dispatch]);

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
