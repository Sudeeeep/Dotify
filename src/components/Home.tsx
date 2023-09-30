import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { User } from "./User";
import { TopArtists } from "./TopArtists";
import { FeaturedPlaylists } from "./FeaturedPlaylists";
import { YourPlaylists } from "./YourPlaylists";

export const Home = () => {
  const {
    state: { playlists },
  } = useContext(StateContext);

  if (playlists) {
    return (
      <div className="overflow-hidden col-span-3">
        <User />
        <div className="h-[75vh] px-8 py-4 overflow-auto">
          <FeaturedPlaylists home />
          <YourPlaylists home />
          <TopArtists home />
        </div>
      </div>
    );
  }
};
