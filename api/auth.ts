// GitHub login for the CMS, step 1 of 2: /admin opens this in a popup, and it
// redirects to GitHub's consent screen. GitHub then sends the user back to
// /api/callback (step 2). Needs GITHUB_OAUTH_CLIENT_ID in the Vercel
// environment variables; see README.md, "Content editing (CMS)".
import crypto from "node:crypto";

// Also in api/callback.ts. Each function file is kept self-contained (no
// shared local imports) so it deploys without extra bundling setup.
const STATE_COOKIE = "cms_oauth_state";

export function GET(request: Request): Response {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response("CMS login isn't set up: GITHUB_OAUTH_CLIENT_ID is missing.", { status: 500 });
  }

  const { origin } = new URL(request.url);
  // Random per login and checked in /api/callback, so a callback can't be
  // triggered by another site (OAuth CSRF).
  const state = crypto.randomBytes(32).toString("hex");

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/callback`);
  // The repo is private, so committing to it needs the full `repo` scope.
  authorize.searchParams.set("scope", "repo");
  authorize.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Set-Cookie": `${STATE_COOKIE}=${state}; Path=/api; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
      "Cache-Control": "no-store",
    },
  });
}
