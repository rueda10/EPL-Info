import axios from 'axios';

const FOOTBALL_DATA_API_KEY = '43d2319104c54b0c9cf2d5679ab2ae5d';
const GUARDIAN_API_KEY = 'b8e5013c-f10c-474c-9cf6-b9416ae989ef';
const FOOTBALL_DATA_BASE_URL = 'https://api.football-data.org/v1/competitions/426/leagueTable';
const GUARDIAN_BASE_URL = `https://content.guardianapis.com/search?section=football&page-size=50&api-key=${GUARDIAN_API_KEY}`;
const JOKECAMP_BASE_URL = 'https://jokecamp.github.io/epl-fantasy-geek/js/static-data.json';

export const FETCH_LEAGUE_DATA = 'FETCH_LEAGUE_DATA';
export const FETCH_NEWS = 'FETCH_NEWS';
export const FETCH_PLAYER_DATA = 'FETCH_PLAYER_DATA';

export function fetchNews() {
  const request = axios.get(GUARDIAN_BASE_URL);

  return {
    type: FETCH_NEWS,
    payload: request
  };
}

export function fetchPlayerData() {
  const request = axios.get(JOKECAMP_BASE_URL);

  return {
    type: FETCH_PLAYER_DATA,
    payload: request
  };
}

export function fetchLeagueData() {
  const request = axios({
    method: 'get',
    url: FOOTBALL_DATA_BASE_URL,
    headers: {
      'X-Auth-Token': FOOTBALL_DATA_API_KEY
    },
    dataType: 'json'
  });

  return {
    type: FETCH_LEAGUE_DATA,
    payload: request
  }
}
