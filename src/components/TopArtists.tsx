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
            <p className="text-xl">Your Top Artists</p>
            {home && <div className="cursor-pointer">Show more</div>}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 min-[1100px]:grid-cols-4 gap-6">
            {new Array(8).fill("").map((_, index) => (
              <div key={index}>
                <div className="flex flex-col gap-4 items-center">
                  <div className="">
                    <div className="w-28 h-28 min-[375px]:w-32 min-[375px]:h-32 min-[450px]:w-44 min-[450px]:h-44 rounded-full bg-[#121212]" />
                  </div>
                  <div className="bg-[#2d2d2d] w-28 min-[375px]:w-32 min-[450px]:w-44 p-4"></div>
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
            home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
          }
        >
          <div className="flex justify-between items-center mb-4">
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
          <p className="sm:text-xl">Your Top Artists</p>
          {home && (
            <Link
              to={"/top-artists"}
              className="text-sm sm:text-md cursor-pointer"
            >
              Show more
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 min-[1100px]:grid-cols-4 gap-6">
          {favouriteArtists &&
            (home ? favouriteArtists.slice(0, 8) : favouriteArtists).map(
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
                        className="w-28 h-28 min-[375px]:w-32 min-[375px]:h-32 min-[450px]:w-44 min-[450px]:h-44 rounded-full  cursor-pointer"
                      />
                    </div>
                    <p className="text-lg text-center line-clamp-1 cursor-pointer hover:underline">
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
};
