import { useContext, useEffect } from "react";
import { Login } from "./components/Login";
import { Dotify } from "./components/Dotify";
import { StateContext } from "./context/StateContext";

function App() {
  const {
    state: { token },
    dispatch,
  } = useContext(StateContext);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      dispatch({ type: "SET_TOKEN", payload: savedToken });
    } else if (window.location.hash) {
      console.log("hello");
      const accessToken = window.location.hash.split("&")[0].split("=")[1];
      dispatch({ type: "SET_TOKEN", payload: accessToken });
      window.location.hash = "";
    }
    if (token) sessionStorage.setItem("token", token);
  }, [token, dispatch]);

  console.log(token);

  return <>{token ? <Dotify /> : <Login />}</>;
}

export default App;
