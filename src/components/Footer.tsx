import { useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { StateContext } from "../context/StateContext";

export const Footer = () => {
  const {
    state: { token, uris },
  } = useContext(StateContext);
  return (
    <div className="col-span-4">
      {token && (
        <SpotifyPlayer
          token={token}
          uris={uris}
          name="Dotify Player"
          play={true}
          hideAttribution
          magnifySliderOnHover={true}
          styles={{
            height: 100,
            bgColor: "black",
            errorColor: "red",
            color: "white",
            sliderColor: "white",
            sliderHandleColor: "white",
            sliderTrackColor: "#474747",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
        />
      )}
    </div>
  );
};
