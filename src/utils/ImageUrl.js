export const getLogoUrl = (file) => {
  return new URL(`../assets/img/teams-logos/${file}`, import.meta.url).href
}

export const getBannerUrl = (file) => {
  return new URL(`../assets/img/teams-banners/${file}`, import.meta.url).href
}

export function getPlayerPP(pp) {
  return new URL(`../assets/img/players-pp/${pp}`, import.meta.url).href
}
