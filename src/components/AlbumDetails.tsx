import { useContext, useEffect, useRef } from "react";
import { StateContext } from "../context/StateContext";
import { Link, useLocation } from "react-router-dom";
import { User } from "./User";
import { AiFillPlayCircle } from "react-icons/ai";
import { ArtistAlbums } from "./ArtistAlbums";

import { useFetchAlbumDetails } from "../hooks/useFetchAlbumDetails";

export const AlbumDetails = () => {
  const { dispatch } = useContext(StateContext);
  const { selectedAlbumDetails, loading, error } = useFetchAlbumDetails();

  const divRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    divRef.current?.scrollTo(0, 0);
  }, [pathname]);

  if (loading) {
    return (
      <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2 overflow-hidden">
        <User />
        <div className="h-[75vh] max-h-full overflow-auto">
          <div className="flex gap-4 items-end m-6">
            <div className="w-32 h-32 min-[450px]:w-36 min-[450px]:h-36 min-[540px]:w-44 min-[540px]:h-44 sm:w-56 sm:h-56 bg-[#121212]"></div>
            <div className="w-[75%] flex flex-col gap-4">
              <div className="p-10 bg-[#A7A7A7]"></div>
              <div className="w-1/2 p-2 bg-[#A7A7A7]"></div>
            </div>
          </div>

          <div className="flex flex-col p-6 text-[#858383]">
            <div className="grid grid-cols-[1rem_1fr_4rem] gap-4 px-4 border-b">
              <div>#</div>
              <div>Title</div>
              <div>Duration</div>
            </div>
            {new Array(3).fill("").map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[1rem_1fr_4rem] gap-4 p-4"
              >
                <div>{index + 1}</div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="bg-[#A7A7A7] p-2 w-40"></div>
                    <div className="bg-[#A7A7A7] p-1 w-16"></div>
                  </div>
                </div>
                <div>
                  <div className="bg-[#A7A7A7] p-2 w-10"></div>
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
      <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2 overflow-hidden">
        <User />
        <div className="px-8 py-4 col-span-3 mb-4">
          <div>
            <div className="flex flex-col justify-center h-[60vh] rounded-lg bg-[#121212]">
              <p className="text-center">
                Ooops! Something went wrong! Please try logging in again
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedAlbumDetails) {
    return (
      <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2 overflow-hidden">
        <User />
        <div ref={divRef} className="h-[75vh] max-h-full overflow-auto">
          <div className="flex gap-4 items-end m-6">
            <img
              src={selectedAlbumDetails.albumImg}
              alt="album thumbnail"
              className="w-32 min-[450px]:w-36 min-[540px]:w-44 sm:w-56"
            />
            <div className="flex flex-col gap-4">
              <p className="text-xs min-[500px]:text-sm mb-1 text-[#D3D4D6]">
                {selectedAlbumDetails.type}
              </p>
              <h1 className="text-xl min-[450px]:text-3xl min-[540px]:text-4xl min-[730px]:text-6xl sm:text-5xl font-bold">
                {selectedAlbumDetails.albumName}
              </h1>
              <div>
                <ul className="list-disc flex gap-6 text-[0.5rem] min-[400px]:text-xs min-[500px]:text-sm sm:text-base">
                  <Link
                    to={`/artist/${selectedAlbumDetails.artists[0].id}`}
                    className="hover:underline"
                  >
                    {selectedAlbumDetails.artists[0].name}
                  </Link>
                  <li>{selectedAlbumDetails.releaseDate.slice(0, 4)}</li>
                  <li>{selectedAlbumDetails.total} songs</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="m-4 w-fit"
            onClick={() =>
              dispatch({
                type: "SET_PLAYER_URIS",
                payload: [selectedAlbumDetails.uri],
              })
            }
          >
            <AiFillPlayCircle className="text-[#1ED760] text-6xl cursor-pointer hover:scale-105" />
          </div>

          <div className="flex flex-col p-6 text-[#858383]">
            <div className="grid grid-cols-[1rem_1fr_4rem] gap-4 px-4 border-b">
              <div>#</div>
              <div>Title</div>
              <div>Duration</div>
            </div>
            {selectedAlbumDetails.tracks.map((track, index) => (
              <div
                key={index}
                className="grid grid-cols-[1rem_1fr_4rem] gap-4 p-4 hover:opacity-80 hover:bg-[#2d2d2d]"
              >
                <div>{index + 1}</div>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <p className="text-white hover:underline cursor-pointer line-clamp-2">
                      {track.trackName}
                    </p>
                    <p className="text-sm line-clamp-1">
                      {track.artists.length > 1
                        ? track.artists.map((artist, index) => {
                            return index === track.artists.length - 1 ? (
                              <Link
                                to={`/artist/${artist.id}`}
                                key={index}
                                className="hover:underline cursor-pointer"
                              >
                                {artist.name}
                              </Link>
                            ) : (
                              <Link
                                to={`/artist/${artist.id}`}
                                key={index}
                                className="hover:underline cursor-pointer"
                              >
                                {artist.name + ", "}
                              </Link>
                            );
                          })
                        : track.artists.map((artist) => (
                            <Link
                              to={`/artist/${artist.id}`}
                              key={index}
                              className="hover:underline cursor-pointer"
                            >
                              {artist.name}
                            </Link>
                          ))}
                    </p>
                  </div>
                </div>
                <div>{track.duration}</div>
              </div>
            ))}
          </div>
          <ArtistAlbums albumPage />
        </div>
      </div>
    );
  }
};
