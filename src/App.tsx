import { useContext, useEffect } from "react";
import { Login } from "./components/Login";
import { Dotify } from "./components/Dotify";
import { StateContext } from "./context/StateContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PlaylistDetails } from "./components/PlaylistDetails";
import { Home } from "./components/Home";
import axios from "axios";

function App() {
  const {
    state: { token },
    dispatch,
  } = useContext(StateContext);

  //setToken
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      dispatch({ type: "SET_TOKEN", payload: savedToken });
    } else if (window.location.hash) {
      const accessToken = window.location.hash.split("&")[0].split("=")[1];
      dispatch({ type: "SET_TOKEN", payload: accessToken });
      window.location.replace(import.meta.env.VITE_DEV_REDIRECT_URI);
    }
    if (token) {
      sessionStorage.setItem("token", token);
    }
  }, [token, dispatch]);

  //fetch user details
  useEffect(() => {
    if (token) {
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
    }
  }, [token]);

  // console.log(token);

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Dotify /> : <Login />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/playlist/:playlistId",
          element: <PlaylistDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
