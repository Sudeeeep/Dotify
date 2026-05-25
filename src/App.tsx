import { useContext, useEffect } from "react";
import { Login } from "./components/Login";
import { Dotify } from "./components/Dotify";
import { StateContext } from "./context/StateContext";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
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
import {
  getItemWithExpiry,
  setItemWithExpiry,
} from "./helpers/storageWithExpiry";
import { exchangeCodeForToken } from "./helpers/pkce";

const AuthenticatedApp = () => {
  const {
    state: { token },
  } = useContext(StateContext);

  const isExchanging = new URLSearchParams(window.location.search).has("code");

  if (!token && isExchanging) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-[#A7A7A7]">Logging in...</p>
      </div>
    );
  }

  return token ? <Outlet /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedApp />,
    children: [
      {
        element: <Dotify />,
        children: [
          { index: true, element: <Home /> },
          { path: "playlist/:playlistId", element: <PlaylistDetails /> },
          { path: "featured-playlists", element: <FeaturedPlaylists /> },
          { path: "your-playlists", element: <YourPlaylists /> },
          { path: "top-artists", element: <TopArtists /> },
          { path: "artist/:artistId", element: <ArtistDetails /> },
          { path: "artist/:artistId/albums", element: <ArtistAlbums /> },
          {
            path: "artist/:artistId/related-artists",
            element: <RelatedArtists />,
          },
          { path: "album/:albumId", element: <AlbumDetails /> },
          { path: "search", element: <Search /> },
        ],
      },
    ],
  },
]);

function App() {
  const {
    state: { token },
    dispatch,
  } = useContext(StateContext);

  // Handle Spotify redirect callback and restore saved token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
      if (codeVerifier) {
        sessionStorage.removeItem("pkce_code_verifier");
        exchangeCodeForToken(code, codeVerifier)
          .then(({ access_token, expires_in }) => {
            setItemWithExpiry("token", access_token, expires_in * 1000);
            dispatch({ type: "SET_TOKEN", payload: access_token });
            window.history.replaceState({}, "", window.location.pathname);
          })
          .catch(() => {
            window.history.replaceState({}, "", window.location.pathname);
          });
      }
      return;
    }

    const savedToken = getItemWithExpiry("token");
    if (savedToken) {
      dispatch({ type: "SET_TOKEN", payload: savedToken });
    }
  }, [dispatch]);

  // Fetch user profile once a token is available
  useEffect(() => {
    if (!token) return;
    axios
      .get(`https://api.spotify.com/v1/me`, {
        headers: { Authorization: `Bearer ${token}` },
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
  }, [token, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
