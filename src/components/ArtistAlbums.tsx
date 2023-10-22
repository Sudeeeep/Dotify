import { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import { User } from "./User";
import { useFetchArtistAlbums } from "../hooks/useFetchArtistAlbums";

export const ArtistAlbums = ({
  artistPage,
  albumPage,
}: {
  artistPage?: boolean;
  albumPage?: boolean;
}) => {
  const { dispatch } = useContext(StateContext);

  const { artistAlbums, selectedArtistId, loading, error } =
    useFetchArtistAlbums();

  if (loading) {
    return (
      <div
        className={
          artistPage || albumPage
            ? "mx-6 mb-10"
            : "col-start-1 row-start-1 col-span-4 lg:col-start-2"
        }
      >
        {!artistPage && !albumPage && <User />}
        <div
          className={
            artistPage || albumPage
              ? ""
              : `h-[75vh] max-h-full px-8 py-4 overflow-auto`
          }
        >
          <div className="flex justify-between mb-4">
            <h1 className="text-xl">Albums</h1>
            {(artistPage || albumPage) && (
              <div className="cursor-pointer">Show more</div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 min-[500px]:gap-8 mb-10">
            {(artistPage || albumPage ? new Array(4) : new Array(8))
              .fill("")
              .map((_, index) => (
                <div key={index} className="py-6 rounded-lg bg-[#121212] ">
                  <div className="flex flex-col gap-4 items-center">
                    <div>
                      <div className="w-[6rem] h-[6rem] min-[350px]:w-28 min-[350px]:h-28 min-[420px]:w-36 min-[420px]:h-36 min-[500px]:w-44 min-[500px]:h-44 rounded-lg bg-[#2d2d2d]" />
                    </div>
                    <div className="w-[6rem] min-[350px]:w-28 min-[420px]:w-36 min-[500px]:w-44 p-4 flex flex-col gap-1 bg-[#2d2d2d]"></div>
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
      <div className="px-8 py-4 col-start-1 row-start-1 col-span-4 lg:col-start-2">
        {!artistPage && !albumPage && <User />}
        <div>
          <div className="flex flex-col justify-center h-[30vh] rounded-lg bg-[#121212]">
            <p className="text-center">
              Ooops! Something went wrong! Please try logging in again
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        artistPage || albumPage
          ? "mx-6 mb-10"
          : "col-start-1 row-start-1 col-span-4 lg:col-start-2"
      }
    >
      {!artistPage && !albumPage && <User />}
      <div
        className={
          artistPage || albumPage
            ? ""
            : `h-[75vh] max-h-full px-8 py-4 overflow-auto`
        }
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-xl">Albums</h1>
          {(artistPage || albumPage) && (
            <Link
              to={`/artist/${selectedArtistId}/albums`}
              className="cursor-pointer"
            >
              Show more
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 min-[500px]:gap-8">
          {artistAlbums &&
            (artistPage || albumPage
              ? artistAlbums.slice(0, 4)
              : artistAlbums
            ).map((item, index) => (
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
                    className="w-[6rem] min-[350px]:w-28 min-[420px]:w-36 min-[500px]:w-44 rounded-lg"
                  />
                  <div className="w-[6rem] min-[350px]:w-28 min-[500px]:w-44 flex flex-col gap-2">
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
    </div>
  );
};
