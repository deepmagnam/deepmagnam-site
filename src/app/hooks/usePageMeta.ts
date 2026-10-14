import { useEffect } from "react";
import { useLocation } from "react-router";
import { SITE_URL } from "../../config/site";
import { pageTitle, type PageMeta } from "../../config/pageMeta";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Sets the document title, meta description, canonical URL and matching
 * Open Graph / Twitter tags for the current page. Prerendered pages already
 * ship these tags; this keeps them right during client-side navigation.
 */
export function usePageMeta({ title, description }: PageMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = pageTitle(title);
    const url = SITE_URL + pathname;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setCanonical(url);
  }, [title, description, pathname]);
}
