import { useContext } from "react";
import { PlaylistDetails } from "./PlaylistDetails";
import { StateContext } from "../context/StateContext";

export const MainScreen = () => {
  const {
    state: { selectedPlaylistId },
  } = useContext(StateContext);

  return selectedPlaylistId && <PlaylistDetails />;
};
