import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { SearchedTracksResponse } from "../types/ResponseTypes/SearchedTracksResponse";
import { msConvert } from "../helpers/msConvert";
import { Link } from "react-router-dom";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const SearchedTracks = () => {
  const {
    state: { token, searchTerm, searchedTracks },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: SearchedTracksResponse }) => {
        // console.log(data);
        const tracks = data.tracks.items.map((item) => {
          return {
            id: item.id,
            trackName: item.name,
            uri: item.uri,
            albumName: item.album.name,
            albumId: item.album.id,
            albumImage: item.album.images[0]?.url,
            duration: msConvert(item.duration_ms),
            artists: item.album.artists.map(({ id, name, uri }) => {
              return { id, name, uri };
            }),
          };
        });
        dispatch({ type: "SET_SEARCHED_TRACKS", payload: tracks });
      });
  }, [searchTerm]);

  if (searchedTracks) {
    return (
      <div>
        <h1 className="text-xl mb-4">Songs</h1>
        <div>
          {searchedTracks &&
            searchedTracks.slice(0, 6).map((track, index) => (
              <div
                key={index}
                className="grid grid-cols-[1rem_1fr_1fr_6rem] gap-4 p-1 hover:opacity-80 hover:bg-[#2d2d2d]"
              >
                <div>{index + 1}</div>
                <div className="flex gap-3">
                  <img
                    src={track.albumImage}
                    alt={track.trackName}
                    className="w-8 h-8 cursor-pointer"
                    onClick={() =>
                      dispatch({
                        type: "SET_PLAYER_URIS",
                        payload: [track.uri],
                      })
                    }
                  />
                  <div className="flex flex-col">
                    <p
                      className="text-white hover:underline cursor-pointer line-clamp-1"
                      onClick={() =>
                        dispatch({
                          type: "SET_PLAYER_URIS",
                          payload: [track.uri],
                        })
                      }
                    >
                      {track.trackName}
                    </p>
                    <div className="text-sm text-[#858383] line-clamp-1">
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
                    </div>
                  </div>
                </div>
                <Link
                  to={`/album/${track.albumId}`}
                  className="hover:underline cursor-pointer line-clamp-1"
                >
                  {track.albumName}
                </Link>

                <div>{track.duration}</div>
              </div>
            ))}
        </div>
      </div>
    );
  }
};
