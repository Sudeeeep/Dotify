import { useContext } from "react";
import { PlaylistDetails } from "./PlaylistDetails";
import { StateContext } from "../context/StateContext";
import { User } from "./User";

export const MainScreen = () => {
  const {
    state: { selectedPlaylistId },
  } = useContext(StateContext);

  if (selectedPlaylistId) {
    return (
      <div className="col-span-3">
        <User />
        <PlaylistDetails />
      </div>
    );
  }
};
