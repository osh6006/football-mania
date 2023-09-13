import axios from "axios";

// 리그의 최근 경기 가져오기
export async function getOneLatestMatches() {
  return (await axios.get("/apifootball/latestMatches.json")).data.response;
}

// 최근 경기 2개 가져오기
export async function getTwoNextMatches() {
  return (await axios.get("/apifootball/nextMatches.json")).data.response;
}

// 라이브 경기 1개 가져오기
export async function getOneLiveMatch() {
  return (await axios.get("/apifootball/latestMatches.json")).data.response;
}

// 리그 순위 가져오기
export async function getStandings() {
  return (await axios.get("/apifootball/standings.json")).data.response;
}

// 탑 스코어 선수 순위 가져오기
export async function getTopScorer() {
  return (await axios.get("/apifootball/topScorer.json")).data.response;
}

// 라이브 스코어 가져오기
export async function getLiveScore() {
  return (await axios.get("/apifootball/liveData.json")).data.response;
}

// 검색 결과 가져오기
export async function getSearchResult() {
  return (await axios.get("/apifootball/search.json")).data.response;
}

// 선수 상세 정보 가져오기
export async function getPlayerDetailResult() {
  return (await axios.get("/apifootball/playerDetail.json")).data.response;
}

// 선수 수상 경력 가져오기
export async function getPlayerTrophies() {
  return (await axios.get("/apifootball/trophies.json")).data.response;
}

// 팀 정보 가져오기
export async function getTeamInfo() {
  return (await axios.get("/apifootball/teamInfo.json")).data.response[0];
}

// 팀 스탯 가져오기
export async function getTeamStat() {
  return (await axios.get("/apifootball/teamStatistic.json")).data.response;
}

// 팀 라인 업 가져오기
export async function getTeamLinup() {}

// 팀 부상자 명단 가져오기
export async function getTeamInjuries() {}

// 팀 최근 경기 정보 가져오기
export async function getTeamLatestMatches() {
  return (await axios.get("/apifootball/latestTeamMatches.json")).data.response;
}

// 팀 시즌 현황 가져오기
export async function getTeamStandings() {
  return (await axios.get("/apifootball/teamStandings.json")).data.response;
}
