
import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "",
  github: "https://github.com/BOUDEFFAZAKARYA/form",
  githubAccount: "https://github.com/BOUDEFFAZAKARYA",
  discord: "",
  calDotCom: "",
}

export const siteConfig = {
  name: "Zakroon",
  description:
    "An open source site with courses and blogs and e-commerce .",
  url: "",
  ogImage: "",
  links,

}