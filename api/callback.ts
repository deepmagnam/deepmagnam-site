// GitHub login for the CMS, step 2 of 2: GitHub redirects here after the user
// approves. This exchanges the one-time code for an access token and hands it
// to the /admin window that opened the popup, using Decap's postMessage
// handshake. Needs GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET.
import crypto from "node:crypto";

// Same as in api/auth.ts.
const STATE_COOKIE = "cms_oauth_state";

type Outcome = { status: "success"; token: string } | { status: "error"; message: string };

function readCookie(request: Request, name: string) {
  for (const part of (request.headers.get("Cookie") ?? "").split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return value.join("=");
  }
  return undefined;
}

function sameString(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

/** JSON that's safe inside an inline <script>. */
const scriptJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

// The popup announces itself; /admin answers from its own origin; only then
// is the result posted back, and only to that same origin (this site).
function page(origin: string, outcome: Outcome, httpStatus: number) {
  const content =
    outcome.status === "success"
      ? { token: outcome.token, provider: "github" }
      : { message: outcome.message, provider: "github" };
  const message = `authorization:github:${outcome.status}:${JSON.stringify(content)}`;
  const visibleText =
    outcome.status === "success"
      ? "Logged in. You can close this window."
      : `Login failed: ${outcome.message}`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="robots" content="noindex"><title>CMS login</title></head>
<body>
<p id="status"></p>
<script>
  (function () {
    var origin = ${scriptJson(origin)};
    var message = ${scriptJson(message)};
    document.getElementById("status").textContent = ${scriptJson(visibleText)};
    if (!window.opener) return;
    window.addEventListener("message", function onMessage(event) {
      if (event.origin !== origin || event.data !== "authorizing:github") return;
      window.removeEventListener("message", onMessage);
      window.opener.postMessage(message, origin);
    });
    window.opener.postMessage("authorizing:github", origin);
  })();
</script>
</body>
</html>`;

  return new Response(html, {
    status: httpStatus,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      // The state is single-use.
      "Set-Cookie": `${STATE_COOKIE}=; Path=/api; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { origin } = url;
  const fail = (message: string, status = 400) => page(origin, { status: "error", message }, status);

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return fail("CMS login isn't set up: GITHUB_OAUTH_CLIENT_ID or GITHUB_OAUTH_CLIENT_SECRET is missing.", 500);
  }

  const githubError = url.searchParams.get("error");
  if (githubError) return fail(url.searchParams.get("error_description") ?? githubError);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = readCookie(request, STATE_COOKIE);
  if (!code || !state || !expectedState || !sameString(state, expectedState)) {
    return fail("The login request expired or didn't come from this site. Close this window and try again.");
  }

  let body: { access_token?: string; error?: string; error_description?: string };
  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
    });
    body = (await response.json()) as typeof body;
  } catch {
    return fail("Couldn't reach GitHub. Try again in a moment.", 502);
  }

  if (!body.access_token) {
    return fail(body.error_description ?? body.error ?? "GitHub didn't return an access token.");
  }
  return page(origin, { status: "success", token: body.access_token }, 200);
}
