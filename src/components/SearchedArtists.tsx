import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { useFetchSearchedArtists } from "../hooks/useFetchSearchedArtists";

export const SearchedArtists = () => {
  const { dispatch } = useContext(StateContext);
  const { searchedArtists, loading, error } = useFetchSearchedArtists();

  if (loading) {
    return (
      <div className="my-6">
        <h1 className="text-xl mb-4">Artists</h1>
        <div className="grid grid-cols-2 min-[500px]:grid-cols-3 min-[770px]:grid-cols-4 xl:grid-cols-5 gap-4">
          {new Array(5).fill("").map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-4 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
            >
              <div className="self-center">
                <div className="w-[6rem] h-[6rem] min-[600px]:w-36 min-[600px]:h-36 bg-[#2d2d2d] rounded-full"></div>
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
    <div className="my-6">
      <h1 className="text-xl mb-4">Artists</h1>
      <div className="grid grid-cols-2 min-[500px]:grid-cols-3 min-[770px]:grid-cols-4 xl:grid-cols-5 gap-4">
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
                className="w-[6rem] h-[6rem] min-[600px]:w-36 min-[600px]:h-36 rounded-full cursor-pointer"
              />
            </div>
            <div>
              <p className="min-[500px]:text-lg cursor-pointer hover:underline line-clamp-2">
                {item.artistName}
              </p>
              <p className="text-sm cursor-pointer text-[#858383]">Artist</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
