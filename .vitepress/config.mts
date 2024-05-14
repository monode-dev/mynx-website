import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mynx UI",
  description: "A Highly Flexible UI System for Solid JS",
  srcDir: "docs",
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      },
    ],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/m.svg" }],
    ["meta", { rel: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    ["meta", { property: "og:title", content: "Mynx UI" }],
    ["meta", { property: "og:site_name", content: "Mynx UI" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://mynx-website.web.app/mynx-og.jpg",
      },
    ],
    ["meta", { property: "og:url", content: "https://mynx-website.web.app/" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: "/kiwi.svg",
    nav: [
      { text: "Home", link: "/" },
      // { text: "Guides", link: "/guides/quickstart" },
      { text: "Cookbook", link: "/cookbook/quickstart" },
      { text: "Docs", link: "/styling/overview" },
    ],

    sidebar: [
      {
        text: "Cookbook",
        items: [{ text: "Quickstart", link: "/cookbook/quickstart" }],
      },
      {
        text: "Styling",
        items: [
          { text: "Overview", link: "/styling/overview" },
          {
            text: "Size",
            link: "/styling/size",
            items: [
              { text: "Width", link: "/styling/size/width" },
              { text: "Height", link: "/styling/size/height" },
            ],
          },
          {
            text: "Layout",
            link: "/styling/layout",
            items: [
              { text: "Axis", link: "/styling/layout/axis" },
              { text: "Align", link: "/styling/layout/align" },
              { text: "Overflow", link: "/styling/layout/overflow" },
              { text: "Z Index", link: "/styling/layout/z-index" },
            ],
          },
          {
            text: "Decoration",
            link: "/styling/overview",
          },
          {
            text: "Text",
            link: "/styling/overview",
          },
        ],
      },
      {
        text: "Components",
        items: [{ text: "Overview", link: "/components/overview" }],
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
