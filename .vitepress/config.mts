import { defineConfig } from "vitepress";
import mynxTmLangJson from "./mynx-tm-grammar.json";
import darkVsTheme from "./dark_vs.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mynx",
  description: "A Language Made for App Development",
  srcDir: "docs",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/m.svg" }],
    ["meta", { rel: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    ["meta", { property: "og:title", content: "Mynx Lang" }],
    ["meta", { property: "og:site_name", content: "Mynx Lang" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://mynx-website.web.app/mynx-og.jpg",
      },
    ],
    ["meta", { property: "og:url", content: "https://mynx-website.web.app/" }],
  ],
  markdown: {
    languages: [mynxTmLangJson as any],
    theme: darkVsTheme,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: "/kiwi.svg",
    nav: [
      { text: "Home", link: "/" },
      // { text: "Guides", link: "/guides/quickstart" },
      { text: "Cookbook", link: "/cookbook/quickstart" },
      { text: "Docs", link: "/docs/overview" },
    ],

    sidebar: [
      {
        text: "Cookbook",
        items: [{ text: "Quickstart", link: "/cookbook/quickstart" }],
      },
      {
        text: "Known Bugs",
        items: [],
      },
      {
        text: "Docs",
        items: [
          { text: "Overview", link: "/docs/overview" },
          { text: "Var and Func Def", link: "/docs/var-and-func-def" },
        ],
      },
      {
        text: "Theory",
        items: [{ text: "Normalization", link: "/theory/normalization" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/monode-dev/Mynx" },
      { icon: `npm`, link: `https://www.npmjs.com/package/mynx` },
      { icon: `x`, link: `https://twitter.com/melchiahmauck` },
    ],
  },
});
