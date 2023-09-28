import axios from "axios";

const basicOpt = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_FOOTBALL_API_KEY}`,
    "X-RapidAPI-Host": `${import.meta.env.VITE_FOOTBALL_API_HOST}`,
  },
};

// 최근 경기를 가져온다.
export async function getLatestMatches(
  leagueId: number,
  season: number,
  matches: number
) {
  if (leagueId && season && matches) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}fixtures`,
      params: {
        league: leagueId,
        season: season,
        last: matches,
      },
    };

    try {
      const response = await axios.request(option);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_LATEST_MATCHES");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_LATEST_MATCHES");
  }
}

// 다음 경기를 가져온다.
export async function getNextMatches(
  leagueId: number,
  season: number,
  matches: number
) {
  if (leagueId && season && matches) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}fixtures`,
      params: {
        league: leagueId,
        season: season,
        next: matches,
      },
    };

    try {
      const response = await axios.request(option);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_NEXT_MATCHES");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_NEXT_MATCHES");
  }
}

// 라이브 경기를 가져온다.
export async function getLiveMatches(leagueId: number, season: number) {
  if (leagueId && season) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}fixtures`,
      params: {
        league: leagueId,
        season: season,
        live: "all",
      },
    };

    try {
      const response = await axios.request(option);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_LIVE_MATCHES");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_LIVE_MATCHES");
  }
}

// 리그 순위를 가져온다.
export async function getLeagueRanking(leagueId?: number, season?: number) {
  if (leagueId && season) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}standings`,
      params: {
        league: leagueId,
        season: season,
      },
    };

    try {
      const response = await axios.request(option);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_RANK");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_RANK");
  }
}

// 각 분야별 탑 플레이어들을 가져온다.
export async function getTopPlayer(
  leagueId: number,
  season: number,
  type: string
) {
  if (leagueId && season && type) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}players/${type}`,
      params: {
        league: leagueId,
        season: season,
      },
    };

    try {
      const response = await axios.request(option);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_TOP_PLAYER");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_TOP_PLAYER");
  }
}

// 리그 스케쥴을 가져온다.
export async function getLeagueSchedule(
  leagueId: number,
  season: number,
  start: string,
  end: string
) {
  if (season && leagueId && start && end) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}fixtures`,
      params: {
        league: leagueId,
        season: season,
        from: start,
        to: end,
        timezone: "Asia/Seoul",
      },
    };

    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_LEAGUE_SCHEDULE");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_LEAGUE_SCHEDULE");
  }
}

// 라이브 스코어 데이터를 가져온다.
export async function getLiveScore(fixturesId: string) {
  if (fixturesId) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}fixtures`,
      params: {
        id: fixturesId,
      },
    };

    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_LIVE_SCORE");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_LIVE_SCORE");
  }
}

// 선수를 검색한 결과의 데이터를 가져온다.
export async function getSearchPlayer(leagueId: number, name: string) {
  if (leagueId && name) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}players`,
      params: {
        league: leagueId,
        search: name,
      },
    };
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_SEARCH_PLAYER");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_SEARCH_PLAYER");
  }
}

// 감독을 검색한 결과의 데이터를 가져온다.
export async function getSearchCoach(leagueId: number, name: string) {
  if (leagueId && name) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}coachs`,
      params: {
        league: leagueId,
        search: name,
      },
    };
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_SEARCH_COACH");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_SEARCH_COACH");
  }
}

// 팀을 검색한 결과의 데이터를 가져온다.
export async function getCoachTeam(leagueId: number, name: string) {
  if (leagueId && name) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}teams`,
      params: {
        league: leagueId,
        search: name,
      },
    };
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_SEARCH_TEAM");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_SEARCH_TEAM");
  }
}

// 리그와 상관없이 시즌을 모두 가져온다.
export async function getAllSeason() {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}leagues/seasons`,
  };
  try {
    const response = await axios.request(option);
    return response.data.response;
  } catch (error) {
    console.error(error);
    throw new Error("ERROR GET DATA IN GET_ALL_SEASON");
  }
}

// 선수 아이디에 맞는 선수 정보를 불러온다.
export async function getPlayerDetail(playerId: number, season: number) {
  if (playerId && season) {
    const option = {
      ...basicOpt,
      url: `${import.meta.env.VITE_FOOTBALL_API_URL}players`,
      params: {
        id: playerId,
        season,
      },
    };

    try {
      const response = await axios.request(option);

      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_PLAYER_DEtAIL");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_PLAYER_DEtAIL");
  }
}

// 선수의 수상 경력을 불러온다.
export async function getPlayerTrophies(playerId: number) {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}trophies`,
    params: {
      player: playerId,
    },
  };

  if (playerId) {
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_PLAYER_TROPHIES");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_PLAYER_TROPHIES");
  }
}

// 팀 정보를 가져온다.
export async function getTeamInfo(teamId?: string) {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}teams`,
    params: {
      id: teamId,
    },
  };

  if (teamId) {
    try {
      const response = await axios.request(option);
      return response.data.response[0];
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_TEAM_LATEST_MATCHES");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_TEAM_LATEST_MATCHES");
  }
}

// 팀 스탯을 가져온다.
export async function getTeamStat(
  leagueId?: number,
  teamId?: string,
  season?: number
) {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}teams/statistics`,
    params: {
      team: teamId,
      league: leagueId,
      season,
    },
  };
  if (leagueId && teamId && season) {
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_TEAM_STAT");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_TEAM_STAT");
  }
}

// 팀 최근 경기를 가져온다.
export async function getTeamLatestMatches(teamId?: string, season?: number) {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}fixtures`,
    params: {
      team: teamId,
      season,
      last: 10,
    },
  };

  if (teamId && season) {
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_TEAM_LATEST_MATCHES");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_TEAM_LATEST_MATCHES");
  }
}

// 팀 라인업을 가져온다.
export async function getTeamLineUp(fixturesId?: string) {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}fixtures`,
    params: {
      id: fixturesId,
    },
  };

  if (fixturesId) {
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_TEAM_LINE_UP");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_TEAM_LINE_UP");
  }
}

// 팀 부상선수를 가져온다.
export async function getTeamInjuries(teamId?: number, season?: number) {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}injuries`,
    params: {
      team: teamId,
      season: season,
    },
  };

  if (teamId && season) {
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_TEAM_INJURIES");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_TEAM_INJURIES");
  }
}

// 팀 리그별 현황을 가져온다.
export async function getTeamStandings(teamId?: string, season?: number) {
  const option = {
    ...basicOpt,
    url: `${import.meta.env.VITE_FOOTBALL_API_URL}standings`,
    params: {
      team: teamId,
      season: season,
    },
  };

  if (teamId && season) {
    try {
      const response = await axios.request(option);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("ERROR GET DATA IN GET_TEAM_STANDINGS");
    }
  } else {
    throw new Error("NOT PARAMETER IN GET_TEAM_STANDINGS");
  }
}
