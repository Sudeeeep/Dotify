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
import { RelatedArtists } from "./components/RelatedArtists";
import { AlbumDetails } from "./components/AlbumDetails";
import { UserResponse } from "./types/ResponseTypes/UserResponse";
import { Search } from "./components/Search";

function App() {
  const {
    state: { token },
    dispatch,
  } = useContext(StateContext);

  //setToken
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      dispatch({ type: "SET_TOKEN", payload: savedToken });
    } else if (window.location.hash) {
      const accessToken = window.location.hash.split("&")[0].split("=")[1];
      dispatch({ type: "SET_TOKEN", payload: accessToken });
      const redirectUri = import.meta.env.PROD
        ? import.meta.env.VITE_PROD_REDIRECT_URI
        : import.meta.env.VITE_DEV_REDIRECT_URI;
      window.location.replace(redirectUri);
    }
    if (token) {
      localStorage.setItem("token", token);
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
        .then(({ data }: { data: UserResponse }) => {
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
        {
          path: "/artist/:artistId/related-artists",
          element: <RelatedArtists />,
        },
        {
          path: "/album/:albumId",
          element: <AlbumDetails />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
