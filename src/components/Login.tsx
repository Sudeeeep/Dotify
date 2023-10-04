import { Header } from "./Header";

export const Login = () => {
  function handleLogin() {
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];

    const redirectUri = import.meta.env.PROD
      ? import.meta.env.VITE_PROD_REDIRECT_URI
      : import.meta.env.VITE_DEV_REDIRECT_URI;

    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(import.meta.env.VITE_CLIENT_ID);
    url += "&scope=" + encodeURIComponent(scope.join(" "));
    url += "&redirect_uri=" + encodeURIComponent(redirectUri);

    window.location.href = url;
  }

  return (
    <>
      <Header />
      <section className="text-center mt-40">
        <h2 className="text-4xl mb-4">Log in to Dotify</h2>
        <button
          className="bg-[#1ED760] text-black px-32 py-4 rounded-3xl"
          onClick={handleLogin}
        >
          Log In
        </button>
      </section>
    </>
  );
};
