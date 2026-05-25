function base64urlEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateCodeVerifier(): string {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  return base64urlEncode(array.buffer);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64urlEncode(digest);
}

export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string
): Promise<{ access_token: string; expires_in: number }> {
  const redirectUri = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_REDIRECT_URI
    : import.meta.env.VITE_DEV_REDIRECT_URI;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: import.meta.env.VITE_CLIENT_ID,
      code_verifier: codeVerifier,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description ?? "Token exchange failed");
  }
  return data;
}
