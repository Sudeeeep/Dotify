import { Footer } from "./Footer";
import { MainScreen } from "./MainScreen";
import { Sidebar } from "./Sidebar";

export const Dotify = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-[85vh_15vh] h-screen">
      <Sidebar />
      <MainScreen />
      <Footer />
    </div>
  );
};
