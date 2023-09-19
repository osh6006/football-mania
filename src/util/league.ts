import { DBLeague } from "../type/dbleague";

export const initLeague = [
  {
    color: "#44066A",
    id: 39,
    imageName: "premier.svg",
    imageToken: "493a2228-4fca-4a30-8c43-897105d939f0",
    label: "EPL",
    mobileScale: 1,
    name: "epl",
    path: "/league/39",
    scale: 1.25,
    value: "epl",
  },
];

export function isLeagueListIncludeId(
  leagueList: DBLeague[],
  league: DBLeague
): boolean {
  let result = false;
  leagueList?.forEach((el) => {
    if (el.id === league.id) {
      result = true;
    }
  });

  return result;
}
