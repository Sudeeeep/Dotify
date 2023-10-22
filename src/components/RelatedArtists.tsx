import { User } from "./User";
import { Link } from "react-router-dom";
import { useFetchRelatedArtists } from "../hooks/useFetchRelatedArtists";

export const RelatedArtists = ({ artistPage }: { artistPage?: boolean }) => {
  const { selectedArtistId, relatedArtists, loading, error } =
    useFetchRelatedArtists();

  if (loading) {
    return (
      <div
        className={
          artistPage
            ? "mx-6 mb-10"
            : "col-start-1 row-start-1 col-span-4 lg:col-start-2"
        }
      >
        {!artistPage && <User />}
        <div
          className={
            artistPage ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto`
          }
        >
          <div className="flex justify-between mb-4">
            <h1 className="text-xl">Fans also like</h1>
            {artistPage && <div>Show more</div>}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 min-[500px]:gap-8 mb-10">
            {(artistPage ? new Array(4) : new Array(8))
              .fill("")
              .map((_, index) => (
                <div key={index} className="py-6 rounded-lg bg-[#121212] ">
                  <div className="flex flex-col gap-4 items-center">
                    <div>
                      <div className="w-[6rem] h-[6rem] min-[350px]:w-28 min-[350px]:h-28 min-[420px]:w-36 min-[420px]:h-36 min-[500px]:w-44 min-[500px]:h-44 rounded-lg bg-[#2d2d2d]" />
                    </div>
                    <div className="w-[6rem] min-[350px]:w-28 min-[500px]:w-44 p-4 flex flex-col gap-1 bg-[#2d2d2d]"></div>
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
      <div className="px-8 py-4 col-start-1 row-start-1 col-span-4 lg:col-start-2 mb-4">
        {!artistPage && <User />}
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

  if (relatedArtists) {
    return (
      <div
        className={
          artistPage
            ? "mx-6 mb-10"
            : "col-start-1 row-start-1 col-span-4 lg:col-start-2"
        }
      >
        {!artistPage && <User />}
        <div
          className={
            artistPage ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto`
          }
        >
          <div className="flex justify-between mb-4">
            <h1 className="text-xl">Fans also like</h1>
            {artistPage && (
              <Link
                to={`/artist/${selectedArtistId}/related-artists`}
                className="cursor-pointer"
              >
                Show more
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 min-[500px]:gap-8">
            {(artistPage ? relatedArtists.slice(0, 4) : relatedArtists).map(
              (item, index) => (
                <Link
                  to={`/artist/${item.artistId}`}
                  key={index}
                  className="py-4 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
                >
                  <div className="flex flex-col gap-4 items-center">
                    <img
                      src={item.artistImg}
                      alt={item.artistName}
                      className="w-[6rem] h-[6rem] min-[350px]:w-28 min-[350px]:h-28 min-[420px]:w-36 min-[420px]:h-36 min-[500px]:w-44 min-[500px]:h-44 rounded-full"
                    />
                    <div className="w-[6rem] min-[350px]:w-28 min-[500px]:w-44 flex flex-col gap-2">
                      <p className="text-lg line-clamp-1 hover:underline">
                        {item.artistName}
                      </p>

                      <p className="list-disc flex gap-4 text-xs text-[#858383]">
                        Artist
                      </p>
                    </div>
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
