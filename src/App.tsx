import { useContext, useEffect } from "react";
import { Login } from "./components/Login";
import { Dotify } from "./components/Dotify";
import { StateContext } from "./context/StateContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PlaylistDetails } from "./components/PlaylistDetails";
import { Home } from "./components/Home";
import axios from "axios";
import { FeaturedPlaylists } from "./components/FeaturedPlaylists";
import { YourPlaylists } from "./components/YourPlaylists";
import { TopArtists } from "./components/TopArtists";
import { ArtistDetails } from "./components/ArtistDetails";
import { ArtistAlbums } from "./components/ArtistAlbums";

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
        {
          path: "/featured-playlists",
          element: <FeaturedPlaylists />,
        },
        {
          path: "/your-playlists",
          element: <YourPlaylists />,
        },
        {
          path: "/top-artists",
          element: <TopArtists />,
        },
        {
          path: "/artist/:artistId",
          element: <ArtistDetails />,
        },

        {
          path: "/artist/:artistId/albums",
          element: <ArtistAlbums />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
