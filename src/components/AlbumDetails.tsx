import { useContext, useEffect, useRef } from "react";
import { StateContext } from "../context/StateContext";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { msConvert } from "../helpers/msConvert";
import { User } from "./User";
import { AiFillPlayCircle } from "react-icons/ai";
import { ArtistAlbums } from "./ArtistAlbums";

export const AlbumDetails = () => {
  const {
    state: { token, selectedAlbumId, selectedAlbumDetails, selectedArtistId },
    dispatch,
  } = useContext(StateContext);
  const divRef = useRef<HTMLDivElement>(null);
  const albumId = useParams().albumId;
  const { pathname } = useLocation();

  useEffect(() => {
    divRef.current?.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (albumId) {
      dispatch({
        type: "SET_SELECTED_ALBUM",
        payload: `${albumId}`,
      });
    }

    if (selectedAlbumId) {
      axios
        .get(`https://api.spotify.com/v1/albums/${selectedAlbumId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          //   console.log(data);
          const albumDetails = {
            albumId: data.id,
            albumName: data.name,
            type: data.type,
            releaseDate: data.release_date,
            albumImg: data.images[0].url,
            uri: data.uri,
            total: data.tracks.total,
            artists: data.artists.map(
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
            tracks: data.tracks.items.map((track) => {
              return {
                id: track.id,
                trackName: track.name,
                uri: track.name,
                duration: msConvert(track.duration_ms),
                artists: track.artists.map(
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
            }),
          };
          console.log(albumDetails);
          dispatch({
            type: "SET_SELECTED_ALBUM_DETAILS",
            payload: albumDetails,
          });
          if (albumDetails.artists[0].name != "Various Artists") {
            dispatch({
              type: "SET_SELECTED_ARTIST",
              payload: albumDetails.artists[0].id,
            });
            dispatch({
              type: "SET_SELECTED_ARTIST",
              payload: albumDetails.artists[0].id,
            });
          }
        });
    }
  }, [selectedAlbumId, albumId]);

  if (selectedAlbumDetails) {
    return (
      <div className="col-span-3 overflow-hidden">
        <User />
        <div ref={divRef} className="h-[75vh] max-h-full overflow-auto">
          <div className="flex gap-4 items-end m-6">
            <img
              src={selectedAlbumDetails.albumImg}
              alt="album thumbnail"
              className="w-56 h-56"
            />
            <div className="flex flex-col gap-4">
              <p className="text-sm mb-1 text-[#D3D4D6]">
                {selectedAlbumDetails.type}
              </p>
              <h1 className="text-6xl font-bold">
                {selectedAlbumDetails.albumName}
              </h1>
              <div>
                <ul className="list-disc flex gap-6">
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

          <div className="m-4">
            <AiFillPlayCircle className="text-[#1ED760] text-6xl cursor-pointer hover:scale-105" />
          </div>

          <div className="flex flex-col p-6 text-[#858383]">
            <div className="grid grid-cols-[1rem_1fr_6rem] gap-4 px-4 border-b">
              <div>#</div>
              <div>Title</div>
              <div>Duration</div>
            </div>
            {selectedAlbumDetails.tracks.map((track, index) => (
              <div
                key={index}
                className="grid grid-cols-[1rem_1fr_6rem] gap-4 p-4 hover:opacity-80 hover:bg-[#2d2d2d]"
              >
                <div>{index + 1}</div>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <p className="text-white hover:underline cursor-pointer">
                      {track.trackName}
                    </p>
                    <p className="text-sm">
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
