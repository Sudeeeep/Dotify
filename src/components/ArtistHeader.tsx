import axios from "axios";
import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { ArtistDetailsType } from "../context/reducer";
import { useParams } from "react-router-dom";
import { RiPlayFill } from "react-icons/ri";

export const ArtistHeader = () => {
  const {
    state: { token, selectedArtistDetails, selectedArtistId },
    dispatch,
  } = useContext(StateContext);

  const artistId = useParams().artistId;

  useEffect(() => {
    if (artistId) {
      dispatch({ type: "SET_SELECTED_ARTIST", payload: artistId });
    }
    if (selectedArtistId) {
      axios
        .get(`https://api.spotify.com/v1/artists/${selectedArtistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          const artistDetails: ArtistDetailsType = {
            artistId: data.id,
            artistName: data.name,
            followers: data.followers.total,
            artistImg: data.images[0].url,
            uri: data.uri,
          };
          dispatch({
            type: "SET_SELECTED_ARTIST_DETAILS",
            payload: artistDetails,
          });
        });
    }
  }, [selectedArtistId, artistId]);

  if (selectedArtistDetails) {
    return (
      <div>
        <div className="flex items-center gap-10 m-6">
          <div className="relative">
            <img
              src={selectedArtistDetails?.artistImg}
              alt={selectedArtistDetails?.artistName}
              className="w-56 h-56 rounded-full cursor-pointer"
            />
            <div className="absolute bottom-0 right-0 text-[black] bg-[#1ED760] p-2 m-1 rounded-full cursor-pointer hover:scale-105">
              <RiPlayFill className="w-8 h-8" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-6xl font-bold">
              {selectedArtistDetails?.artistName}
            </h1>

            <ul className="list-disc flex gap-6">
              <p>Artist</p>
              <li>{selectedArtistDetails?.followers} likes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
