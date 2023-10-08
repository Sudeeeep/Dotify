import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Home } from "./Home";
import { User } from "./User";
import { SearchedTracks } from "./SearchedTracks";
import { SearchedArtists } from "./SearchedArtists";
export const Search = () => {
  const {
    state: { searchTerm },
  } = useContext(StateContext);

  return (
    <div className="col-span-3 overflow-hidden">
      <User />
      {searchTerm == "" && <Home search />}
      {searchTerm !== "" && (
        <div className="h-[75vh] px-8 py-4 overflow-auto">
          <SearchedTracks />
          <SearchedArtists />
        </div>
      )}
    </div>
  );
};
