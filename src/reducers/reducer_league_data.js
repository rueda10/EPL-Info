import { FETCH_LEAGUE_DATA } from '../actions/ajax_calls';

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUE_DATA:
      var newStateArray = state.slice(0);
      newStateArray.map((club) => {
        club.position = findPropValue(action.payload.data.standing, club.name, "position");
        club.playedGames = findPropValue(action.payload.data.standing, club.name, "playedGames");
        club.points = findPropValue(action.payload.data.standing, club.name, "points");
        club.goals = findPropValue(action.payload.data.standing, club.name, "goals");
        club.goalsAgainst = findPropValue(action.payload.data.standing, club.name, "goalsAgainst");
        club.goalDifference = findPropValue(action.payload.data.standing, club.name, "goalDifference");
        club.wins = findPropValue(action.payload.data.standing, club.name, "wins");
        club.draws = findPropValue(action.payload.data.standing, club.name, "draws");
        club.losses = findPropValue(action.payload.data.standing, club.name, "losses");
        club.home = findPropValue(action.payload.data.standing, club.name, "home");
        club.away = findPropValue(action.payload.data.standing, club.name, "away");
      });

      return newStateArray;
  }
  return state;
}

function findPropValue(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++) {
    if (arr[i]['teamName'].includes(propName)) {
      return arr[i][propValue];
    }
  }

  // will return undefined if not found; you could return a default instead
}

const initialState = [
  {
    name: 'Arsenal',
    short_name: 'ARS',
    key_name: 'Arsenal',
    alias: [
      'arsenal',
      'gunners'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t3.svg"
  },
  {
    name: 'AFC Bournemouth',
    short_name: 'BOU',
    key_name: 'Bournemouth',
    alias: [
      'bournemouth',
      'cherries'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t91.svg"
  },
  {
    name: 'Burnley',
    short_name: 'BUR',
    key_name: 'Burnley',
    alias: [
      'burnley',
      'clarets'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t90.svg"
  },
  {
    name: 'Chelsea',
    short_name: 'CHE',
    key_name: 'Chelsea',
    alias: [
      'chelsea',
      'blues'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t8.svg"
  },
  {
    name: 'Crystal Palace',
    short_name: 'CRY',
    key_name: 'Palace',
    alias: [
      'palace',
      'eagles'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t31.svg"
  },
  {
    name: 'Everton',
    short_name: 'EVE',
    key_name: 'Everton',
    alias: [
      'everton',
      'toffees'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t11.svg"
  },
  {
    name: 'Hull City',
    short_name: 'HUL',
    key_name: 'Hull',
    alias: [
      'hull',
      'tigers'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t88.svg"
  },
  {
    name: 'Leicester City',
    short_name: 'LEI',
    key_name: 'Leicester',
    alias: [
      'leicester',
      'foxes'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t13.svg"
  },
  {
    name: 'Liverpool',
    short_name: 'LIV',
    key_name: 'Liverpool',
    alias: [
      'liverpool',
      'reds'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t14.svg"
  },
  {
    name: 'Manchester City',
    short_name: 'MCI',
    key_name: 'Man City',
    alias: [
      'manchester city',
      'man city',
      'citizens'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t43.svg"
  },
  {
    name: 'Manchester United',
    short_name: 'MUN',
    key_name: 'Man United',
    alias: [
      'manchester united',
      'man united',
      'red devils'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t1.svg"
  },
  {
    name: 'Middlesbrough',
    short_name: 'MID',
    key_name: 'Boro',
    alias: [
      'middlesbrough',
      'boro'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t25.svg"
  },
  {
    name: 'Southampton',
    short_name: 'SOU',
    key_name: 'Southampton',
    alias: [
      'southampton',
      'saints'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t20.svg"
  },
  {
    name: 'Stoke City',
    short_name: 'STK',
    key_name: 'Stoke',
    alias: [
      'stoke',
      'potters'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t110.svg"
  },
  {
    name: 'Sunderland',
    short_name: 'SUN',
    key_name: 'Sunderland',
    alias: [
      'sunderland',
      'black cats'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t56.svg"
  },
  {
    name: 'Swansea City',
    short_name: 'SWA',
    key_name: 'Swansea',
    alias: [
      'swansea',
      'swans'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t80.svg"
  },
  {
    name: 'Tottenham Hotspur',
    short_name: 'TOT',
    key_name: 'Tottenham',
    alias: [
      'tottenham',
      'spurs'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t6.svg"
  },
  {
    name: 'Watford',
    short_name: 'WAT',
    key_name: 'Watford',
    alias: [
      'watford',
      'hornets'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t57.svg"
  },
  {
    name: 'West Bromwich Albion',
    short_name: 'WBA',
    key_name: 'West Brom',
    alias: [
      'west bromwich',
      'west brom',
      'albion',
      'baggies'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t35.svg"
  },
  {
    name: 'West Ham',
    short_name: 'WHU',
    key_name: 'West Ham',
    alias: [
      'west ham',
      'hammers',
      'irons'
    ],
    badge: "https://platform-static-files.s3.amazonaws.com/premierleague/badges/t21.svg"
  }
];
