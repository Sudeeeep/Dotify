import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "./User";

export const TopArtists = ({ home }: { home?: boolean }) => {
  const {
    state: { token, favouriteArtists },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        const artistDetails = data.items.map((item) => {
          return {
            artistId: item.id,
            artistName: item.name,
            artistImg: item.images[0].url,
          };
        });
        dispatch({ type: "SET_FAVOURITE_ARTISTS", payload: artistDetails });
      });
  }, []);

  if (favouriteArtists) {
    return (
      <div className={home ? "" : `col-span-3`}>
        {!home && <User />}
        <div
          className={
            home ? "" : `h-[75vh] max-h-full px-8 py-4 overflow-auto col-span-3`
          }
        >
          <div className="flex justify-between mb-4">
            <p className="text-xl">Your Top Artists</p>
            {home && (
              <Link to={"/top-artists"} className="cursor-pointer">
                Show more
              </Link>
            )}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {(home ? favouriteArtists.slice(0, 8) : favouriteArtists).map(
              (item, index) => (
                <div key={index} className="">
                  <div className="flex flex-col gap-4 items-center">
                    <div className="relative">
                      <img
                        src={item.artistImg}
                        alt={item.artistName}
                        className="w-44 h-44 rounded-full  cursor-pointer"
                      />
                    </div>
                    <p className="text-lg text-center cursor-pointer hover:underline">
                      {item.artistName}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
};
