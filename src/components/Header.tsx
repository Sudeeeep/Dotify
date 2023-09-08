import dotifyLogo from "../assets/images/spotify-2.svg";

export const Header = () => {
  return (
    <>
      <header className="flex items-center gap-2 py-8 px-12 bg-black">
        <img className="w-12 cursor-pointer" src={dotifyLogo} alt="dotify" />
        <h1 className="text-2xl cursor-pointer">Dotify</h1>
      </header>
    </>
  );
};
