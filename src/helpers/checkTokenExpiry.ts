import { ActionType } from "../context/reducer";
import { getItemWithExpiry } from "./storageWithExpiry";

export function checkTokenExpiry(dispatch: React.Dispatch<ActionType>) {
  const savedToken = getItemWithExpiry("token");
  if (!savedToken) {
    dispatch({ type: "SET_TOKEN", payload: null });
  }
}
