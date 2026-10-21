// In api/_tests/ because Vercel deploys every other file in api/ as a
// function; directories starting with "_" are skipped.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET as auth } from "../auth";
import { GET as callback } from "../callback";

const SITE = "https://deepmagnam-site.vercel.app";

beforeEach(() => {
  vi.stubEnv("GITHUB_OAUTH_CLIENT_ID", "client-id");
  vi.stubEnv("GITHUB_OAUTH_CLIENT_SECRET", "client-secret");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

/** Starts a login; returns the state GitHub would echo back and the cookie the browser would keep. */
function startLogin() {
  const response = auth(new Request(`${SITE}/api/auth?provider=github&site_id=x&scope=repo`));
  const location = new URL(response.headers.get("Location")!);
  const cookie = response.headers.get("Set-Cookie")!;
  return { response, location, cookie, state: location.searchParams.get("state")! };
}

const callbackRequest = (query: string, cookie?: string) =>
  new Request(`${SITE}/api/callback?${query}`, { headers: cookie ? { Cookie: cookie.split(";")[0] } : {} });

function mockGitHub(body: object) {
  const fetchMock = vi.fn(async () => Response.json(body));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("/api/auth", () => {
  it("redirects to GitHub with this site's callback, the repo scope and a random state", () => {
    const { response, location, cookie, state } = startLogin();

    expect(response.status).toBe(302);
    expect(location.origin + location.pathname).toBe("https://github.com/login/oauth/authorize");
    expect(location.searchParams.get("client_id")).toBe("client-id");
    expect(location.searchParams.get("redirect_uri")).toBe(`${SITE}/api/callback`);
    expect(location.searchParams.get("scope")).toBe("repo");
    expect(state).toMatch(/^[0-9a-f]{64}$/);
    expect(startLogin().state).not.toBe(state);

    expect(cookie).toContain(`cms_oauth_state=${state};`);
    expect(cookie).toMatch(/HttpOnly/);
    expect(cookie).toMatch(/Secure/);
    expect(cookie).toMatch(/SameSite=Lax/);
  });

  it("explains a missing client ID", () => {
    vi.stubEnv("GITHUB_OAUTH_CLIENT_ID", "");
    const response = auth(new Request(`${SITE}/api/auth`));
    expect(response.status).toBe(500);
  });
});

describe("/api/callback", () => {
  it("exchanges the code and posts the token to this site only", async () => {
    const { state, cookie } = startLogin();
    const fetchMock = mockGitHub({ access_token: "gho_token</script>" });

    const response = await callback(callbackRequest(`code=abc&state=${state}`, cookie));
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Set-Cookie")).toContain("Max-Age=0");
    expect(fetchMock).toHaveBeenCalledWith("https://github.com/login/oauth/access_token", expect.anything());
    const sent = JSON.parse((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(sent).toEqual({
      client_id: "client-id",
      client_secret: "client-secret",
      code: "abc",
      redirect_uri: `${SITE}/api/callback`,
    });

    expect(html).toContain(`var origin = "${SITE}";`);
    expect(html).toContain("postMessage(message, origin)");
    expect(html).not.toMatch(/postMessage\([^)]*["']\*["']/);
    // Decap's message format, with the token escaped so it can't close the <script>.
    expect(html).toContain('authorization:github:success:{\\"token\\":\\"gho_token\\u003c/script>\\",\\"provider\\":\\"github\\"}');
    expect(html).not.toContain("gho_token</script>");
    expect(html).not.toContain("client-secret");
  });

  it.each([
    ["no state cookie", (state: string) => callbackRequest(`code=abc&state=${state}`)],
    ["a different state", (_state: string, cookie: string) => callbackRequest("code=abc&state=forged", cookie)],
    ["no code", (state: string, cookie: string) => callbackRequest(`state=${state}`, cookie)],
  ])("rejects a callback with %s, without calling GitHub", async (_label, makeRequest) => {
    const { state, cookie } = startLogin();
    const fetchMock = mockGitHub({ access_token: "gho_token" });

    const response = await callback(makeRequest(state, cookie));
    expect(response.status).toBe(400);
    expect(await response.text()).toContain("authorization:github:error:");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("passes on GitHub's error", async () => {
    const { state, cookie } = startLogin();
    mockGitHub({ error: "bad_verification_code", error_description: "The code passed is incorrect or expired." });

    const html = await (await callback(callbackRequest(`code=old&state=${state}`, cookie))).text();
    expect(html).toContain("The code passed is incorrect or expired.");
    expect(html).not.toContain("authorization:github:success");
  });

  it("explains missing secrets", async () => {
    vi.stubEnv("GITHUB_OAUTH_CLIENT_SECRET", "");
    const response = await callback(callbackRequest("code=abc&state=x", "cms_oauth_state=x"));
    expect(response.status).toBe(500);
    expect(await response.text()).toContain("GITHUB_OAUTH_CLIENT_SECRET");
  });
});
