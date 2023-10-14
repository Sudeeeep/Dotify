import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { RiPlayFill } from "react-icons/ri";
import { useFetchArtistDetails } from "../hooks/useFetchArtistDetails";

export const ArtistHeader = () => {
  const { dispatch } = useContext(StateContext);

  const { selectedArtistDetails, loading, error } = useFetchArtistDetails();

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-10 m-6">
          <div className="relative">
            <div className="w-56 h-56 bg-[#121212] rounded-full cursor-pointer"></div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="bg-[#A7A7A7] p-6 w-1/2"></div>

            <div className="bg-[#A7A7A7] p-2 w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-8 py-4 col-span-3">
        <div>
          <div className="flex flex-col justify-center h-[45vh] rounded-lg bg-[#121212]">
            <p className="text-center">
              Ooops! Something went wrong! Please try logging in again
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-10 m-6">
        <div className="relative">
          <img
            src={selectedArtistDetails?.artistImg}
            alt={selectedArtistDetails?.artistName}
            className="w-56 h-56 rounded-full cursor-pointer"
          />
          <div
            onClick={() =>
              selectedArtistDetails &&
              dispatch({
                type: "SET_PLAYER_URIS",
                payload: [selectedArtistDetails.uri],
              })
            }
            className="absolute bottom-0 right-0 text-[black] bg-[#1ED760] p-2 m-1 rounded-full cursor-pointer hover:scale-105"
          >
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
};
