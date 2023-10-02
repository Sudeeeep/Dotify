import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { User } from "./User";
import { Link, useParams } from "react-router-dom";

export const RelatedArtists = ({ artistPage }: { artistPage?: boolean }) => {
  const {
    state: { token, selectedArtistId, relatedArtists },
    dispatch,
  } = useContext(StateContext);

  const artistId = useParams().artistId;

  useEffect(() => {
    if (artistId) {
      dispatch({ type: "SET_SELECTED_ARTIST", payload: artistId });
    }
    if (selectedArtistId) {
      axios
        .get(
          `https://api.spotify.com/v1/artists/${selectedArtistId}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          const artistDetails = data.artists.map((item) => {
            return {
              artistId: item.id,
              artistName: item.name,
              artistImg: item.images[0].url,
            };
          });
          console.log(artistDetails);
          dispatch({ type: "SET_RELATED_ARTISTS", payload: artistDetails });
        });
    }
  }, [selectedArtistId, artistId]);

  if (relatedArtists) {
    return (
      <div className={artistPage ? "mx-6 mb-10" : "col-span-3"}>
        {!artistPage && <User />}
        <div
          className={
            artistPage
              ? ""
              : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
          }
        >
          <div className="flex justify-between mb-4">
            <h1 className="text-xl">Fans also like</h1>
            {artistPage && (
              <Link
                to={`/artist/${artistId}/related-artists`}
                className="cursor-pointer"
              >
                Show more
              </Link>
            )}
          </div>
          <div className="grid grid-cols-4 gap-8">
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
                      className="w-44 h-44 rounded-full"
                    />
                    <div className="w-44 flex flex-col gap-2">
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
