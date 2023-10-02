import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { User } from "./User";

export const ArtistAlbums = ({ artistPage }: { artistPage?: boolean }) => {
  const {
    state: { token, user, selectedArtistId, artistAlbums },
    dispatch,
  } = useContext(StateContext);

  const artistId = useParams().artistId;

  useEffect(() => {
    if (artistId) {
      dispatch({ type: "SET_SELECTED_ARTIST", payload: artistId });
    }
    if (selectedArtistId && user) {
      axios
        .get(`https://api.spotify.com/v1/artists/${selectedArtistId}/albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          const albums = data.items.map((item) => {
            return {
              albumId: item.id,
              albumName: item.name,
              type: item.album_type,
              releaseDate: item.release_date,
              albumImg: item.images[0].url,
              uri: item.uri,
              artists: item.artists.map(
                ({
                  id,
                  name,
                  uri,
                }: {
                  id: string;
                  name: string;
                  uri: string;
                }) => {
                  return { id, name, uri };
                }
              ),
            };
          });
          console.log(albums);
          dispatch({ type: "SET_ALBUMS", payload: albums });
        });
    }
  }, [selectedArtistId, artistId, user]);

  if (artistAlbums) {
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
            <h1 className="text-xl">Albums</h1>
            {artistPage && (
              <Link
                to={`/artist/${artistId}/albums`}
                className="cursor-pointer"
              >
                Show more
              </Link>
            )}
          </div>
          <div className="grid grid-cols-4 gap-8">
            {(artistPage ? artistAlbums.slice(0, 4) : artistAlbums).map(
              (item, index) => (
                <Link
                  to={`/album/${item.albumId}`}
                  key={index}
                  className="py-4 rounded-lg bg-[#121212] hover:bg-[#2d2d2d] cursor-pointer"
                >
                  <div className="flex flex-col gap-4 items-center">
                    <img
                      src={item.albumImg}
                      alt={item.albumName}
                      className="w-44 h-44 rounded-lg"
                    />
                    <div className="w-44 flex flex-col gap-2">
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
              )
            )}
          </div>
        </div>
      </div>
    );
  }
};
