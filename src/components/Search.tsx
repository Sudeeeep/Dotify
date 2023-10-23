import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Home } from "./Home";
import { User } from "./User";
import { SearchedTracks } from "./SearchedTracks";
import { SearchedArtists } from "./SearchedArtists";
import { SearchedAlbums } from "./SearchedAlbums";
import { SearchedPlaylists } from "./SearchedPlaylists";
export const Search = () => {
  const {
    state: { searchTerm },
  } = useContext(StateContext);

  return (
    <div className="col-start-1 row-start-1 col-span-4 lg:col-start-2 overflow-hidden">
      <User />
      {searchTerm == "" && <Home search />}
      {searchTerm !== "" && (
        <div className="h-[75vh] px-6 py-4 overflow-auto">
          <SearchedTracks />
          <SearchedArtists />
          <SearchedAlbums />
          <SearchedPlaylists />
        </div>
      )}
    </div>
  );
};
