import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { Playlists } from "./Playlists";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="bg-black overflow-hidden">
      <div className="flex flex-col gap-4 bg-[#121212]  m-2 rounded-lg p-3">
        <Link to={"/"}>
          <div className="flex gap-2 text-xl text-[#A7A7A7] hover:text-white cursor-pointer">
            <AiFillHome />
            <span className="">Home</span>
          </div>
        </Link>
        <Link
          to={"/search"}
          className="flex gap-2 text-xl text-[#A7A7A7] hover:text-white cursor-pointer"
        >
          <AiOutlineSearch />
          <span>Search</span>
        </Link>
      </div>
      <Playlists />
    </div>
  );
};
