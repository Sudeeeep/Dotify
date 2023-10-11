import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedArtistsResponse } from "../types/ResponseTypes/SearchedArtistsResponse";
import { Link } from "react-router-dom";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const SearchedArtists = () => {
  const {
    state: { token, searchTerm, searchedArtists },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedArtistsResponse }) => {
        const artists = data.artists.items.map((item) => {
          return {
            artistId: item.id,
            artistName: item.name,
            artistImg: item.images[0].url,
          };
        });

        dispatch({ type: "SET_SEARCHED_ARTISTS", payload: artists });
      });
  }, [searchTerm]);

  if (searchedArtists) {
    return (
      <div className="my-6">
        <h1 className="text-xl mb-4">Artists</h1>
        <div className="grid grid-cols-5 gap-6">
          {searchedArtists?.slice(0, 5).map((item, index) => (
            <Link
              to={`/artist/${item.artistId}`}
              key={index}
              onClick={() =>
                dispatch({
                  type: "SET_SELECTED_ARTIST",
                  payload: item.artistId,
                })
              }
              className="flex flex-col gap-4 p-4 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
            >
              <div className="self-center">
                <img
                  src={item.artistImg}
                  alt={item.artistName}
                  className="w-36 h-36 rounded-full  cursor-pointer"
                />
              </div>
              <div>
                <p className="text-lg cursor-pointer hover:underline">
                  {item.artistName}
                </p>
                <p className="text-sm cursor-pointer text-[#858383]">Artist</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};
