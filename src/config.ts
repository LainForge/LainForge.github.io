import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "http://lainforge.org/",
  author: "LainForge",
  desc: "The Best Open Source Organization in the whole World.",
  title: "LainForge",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  projectsPerPage: 5,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const MODE = process.env.NODE_ENV || "development";

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/LainForge",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://discord.gg/UxGdN56meC",
    linkTitle: `${SITE.title} on Discord`,
    active: true,
  },
];
