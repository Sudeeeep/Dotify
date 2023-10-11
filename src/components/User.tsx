import { useContext, useEffect, useState } from "react";
import { RiUser3Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { StateContext } from "../context/StateContext";
import dotifyLogo from "../assets/images/spotify-2.svg";
import { Link, useLocation } from "react-router-dom";
import { checkTokenExpiry } from "../helpers/checkTokenExpiry";

export const User = () => {
  const {
    state: { user, searchTerm },
    dispatch,
  } = useContext(StateContext);

  const { pathname } = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    checkTokenExpiry(dispatch);
    if (searchTerm !== "" && !pathname.includes("/search")) {
      dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    }
  }, []);

  return (
    <div className="pt-2 p-4">
      <div className="flex justify-between">
        {pathname.includes("/search") ? (
          <div className="w-1/2 flex items-center">
            <span className="absolute px-4 text-xl">
              <AiOutlineSearch />
            </span>

            <input
              type="text"
              name="search"
              placeholder="What do you want to listen to?"
              autoComplete="off"
              className="w-full px-12 py-3 rounded-full bg-[#242424]"
              value={searchTerm}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
              }
            />
          </div>
        ) : (
          <Link to={"/"} className="flex items-center gap-2">
            <img
              className="w-10 cursor-pointer"
              src={dotifyLogo}
              alt="dotify"
            />
            <h1 className="text-2xl cursor-pointer">Dotify</h1>
          </Link>
        )}
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
        className={`bg-[#121212] flex flex-col absolute right-6 z-[1]  ${
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
            localStorage.clear();
          }}
        >
          Logout
        </span>
      </div>
    </div>
  );
};
