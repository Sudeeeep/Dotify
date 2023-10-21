import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { User } from "./User";
import { TopArtists } from "./TopArtists";
import { FeaturedPlaylists } from "./FeaturedPlaylists";
import { YourPlaylists } from "./YourPlaylists";

export const Home = ({ search }: { search?: boolean }) => {
  const {
    state: { playlists },
  } = useContext(StateContext);

  if (playlists) {
    return (
      <div className="overflow-hidden col-start-1 row-start-1 col-span-4 lg:col-start-2">
        {!search && <User />}
        <div className="max-h-full h-[75vh] px-8 py-4 overflow-auto">
          <FeaturedPlaylists home />
          <YourPlaylists home />
          <TopArtists home />
        </div>
      </div>
    );
  }
};
