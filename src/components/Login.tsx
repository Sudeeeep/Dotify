import { Header } from "./Header";
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "../helpers/pkce";

export const Login = () => {
  async function handleLogin() {
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
      "streaming",
    ];

    const redirectUri = import.meta.env.PROD
      ? import.meta.env.VITE_PROD_REDIRECT_URI
      : import.meta.env.VITE_DEV_REDIRECT_URI;

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    sessionStorage.setItem("pkce_code_verifier", codeVerifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: scope.join(" "),
      redirect_uri: redirectUri,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.href =
      "https://accounts.spotify.com/authorize?" + params.toString();
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
