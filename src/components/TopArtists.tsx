import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link } from "react-router-dom";
import { User } from "./User";
import { useFetchTopArtists } from "../hooks/useFetchTopArtists";

export const TopArtists = ({ home }: { home?: boolean }) => {
  const { dispatch } = useContext(StateContext);
  const { favouriteArtists, loading, error } = useFetchTopArtists();

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
            <p className="text-xl">Your Top Artists</p>
            {home && <div className="cursor-pointer">Show more</div>}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {new Array(8).fill("").map((_, index) => (
              <div key={index}>
                <div className="flex flex-col gap-4 items-center">
                  <div className="">
                    <div className="w-44 h-44 rounded-full bg-[#121212] cursor-pointer" />
                  </div>
                  <div className="bg-[#2d2d2d] w-44 p-4"></div>
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
            <p className="text-xl">Your Top Artists</p>
            {home && <div className="cursor-pointer">Show more</div>}
          </div>
          <div className="mb-10">
            <div className="flex flex-col justify-center h-[75vh] overflow-auto rounded-lg  bg-[#121212]">
              <p className="text-center">
                Ooops! Something went wrong! Please try logging in again
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (favouriteArtists) {
    return (
      <div className={home ? "" : `col-span-3`}>
        {!home && <User />}
        <div
          className={
            home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
          }
        >
          <div className="flex justify-between mb-4">
            <p className="text-xl">Your Top Artists</p>
            {home && (
              <Link to={"/top-artists"} className="cursor-pointer">
                Show more
              </Link>
            )}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {(home ? favouriteArtists.slice(0, 8) : favouriteArtists).map(
              (item, index) => (
                <Link
                  to={`/artist/${item.artistId}`}
                  key={index}
                  onClick={() =>
                    dispatch({
                      type: "SET_SELECTED_ARTIST",
                      payload: item.artistId,
                    })
                  }
                >
                  <div className="flex flex-col gap-4 items-center">
                    <div className="">
                      <img
                        src={item.artistImg}
                        alt={item.artistName}
                        className="w-44 h-44 rounded-full  cursor-pointer"
                      />
                    </div>
                    <p className="text-lg text-center cursor-pointer hover:underline">
                      {item.artistName}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
};
