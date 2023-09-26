import { useContext, useEffect, useState } from "react";
import { RiUser3Line } from "react-icons/ri";
import { StateContext } from "../context/StateContext";
import axios from "axios";
import dotifyLogo from "../assets/images/spotify-2.svg";

export const User = () => {
  const {
    state: { token, user },
    dispatch,
  } = useContext(StateContext);

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: "SET_USER",
          payload: {
            name: data.display_name,
            id: data.id,
            country: data.country,
            imageUrl: data.images[0]?.url,
          },
        });
      });
  }, []);

  return (
    <div className="pt-2 p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img className="w-10 cursor-pointer" src={dotifyLogo} alt="dotify" />
          <h1 className="text-2xl cursor-pointer">Dotify</h1>
        </div>
        <div>
          <button
            className="bg-black p-3 border border-black rounded-full"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <RiUser3Line />
          </button>
        </div>
      </div>

      <div
        className={`bg-[#121212] flex flex-col absolute right-6  ${
          menuVisible ? "block" : "hidden"
        }`}
      >
        <span
          className="hover:bg-[#2d2d2d] cursor-pointer py-2 px-4"
          onClick={() => setMenuVisible(false)}
        >
          {user?.name}
        </span>
        <span
          className="hover:bg-[#2d2d2d] cursor-pointer py-2 px-4"
          onClick={() => {
            setMenuVisible(false);
            dispatch({ type: "SET_TOKEN", payload: null });
            sessionStorage.clear();
          }}
        >
          Logout
        </span>
      </div>
    </div>
  );
};
