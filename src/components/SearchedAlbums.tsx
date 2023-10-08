import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedAlbumsResponse } from "../types/ResponseTypes/SearchedAlbumsResponse";
import { Link } from "react-router-dom";

export const SearchedAlbums = () => {
  const {
    state: { token, searchTerm, searchedAlbums },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=album`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedAlbumsResponse }) => {
        const albums = data.albums.items.map((item) => {
          return {
            albumId: item.id,
            albumName: item.name,
            type: item.album_type,
            releaseDate: item.release_date,
            albumImg: item.images[0].url,
          };
        });

        dispatch({ type: "SET_SEARCHED_ALBUMS", payload: albums });
      });
  }, [searchTerm]);

  if (searchedAlbums) {
    return (
      <div className="my-6">
        <h1 className="text-xl mb-4">Albums</h1>
        <div className="grid grid-cols-5 gap-5">
          {searchedAlbums.slice(0, 5).map((item, index) => (
            <Link
              to={`/album/${item.albumId}`}
              key={index}
              className="py-4 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
              onClick={() =>
                dispatch({
                  type: "SET_SELECTED_ALBUM",
                  payload: item.albumId,
                })
              }
            >
              <div className="flex flex-col gap-4 items-center">
                <img
                  src={item.albumImg}
                  alt={item.albumName}
                  className="w-36 h-36 rounded-lg"
                />
                <div className="w-44 flex flex-col gap-2 px-4">
                  <p className="text-lg line-clamp-1 hover:underline">
                    {item.albumName}
                  </p>
                  <div>
                    <ul className="list-disc flex gap-4 text-xs text-[#858383]">
                      <p>{item.releaseDate.slice(0, 4)}</p>
                      <li>{item.type}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};
