import {FETCH_LEAGUE_DATA} from '../actions/ajax_calls';

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_LEAGUE_DATA:
            const updatedItems = state.map(item => {
                const teamIndex = findTeamIndex(action.payload.data.standing, item.name, item.key_name);
                
                return {
                    ...item,
                    position: action.payload.data.standing[teamIndex].position,
                    playedGames: action.payload.data.standing[teamIndex].playedGames,
                    points: action.payload.data.standing[teamIndex].points,
                    goals: action.payload.data.standing[teamIndex].goals,
                    goalsAgainst: action.payload.data.standing[teamIndex].goalsAgainst,
                    goalDifference: action.payload.data.standing[teamIndex].goalDifference,
                    wins: action.payload.data.standing[teamIndex].wins,
                    draws: action.payload.data.standing[teamIndex].draws,
                    losses: action.payload.data.standing[teamIndex].losses,
                    home: action.payload.data.standing[teamIndex].home,
                    away: action.payload.data.standing[teamIndex].away
                }
            });
            
            return updatedItems;
        default:
            return state;
    }
    
    return state;
}

function findTeamIndex(arr, initialTeamName, keyName) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].teamName.includes(initialTeamName) ||
            arr[i].teamName.includes(keyName)) {
            return i;
        }
    }
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
        name: 'Brighton and Hove Albion',
        short_name: 'BHA',
        key_name: 'Brighton',
        alias: [
            'brighton',
            'seagulls'
        ],
        badge: 'https://platform-static-files.s3.amazonaws.com/premierleague/badges/t36.svg'
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
        name: 'Huddersfield Town',
        short_name: 'HUD',
        key_name: 'Huddersfield',
        alias: [
            'huddersfield',
            'terriers'
        ],
        badge: 'https://platform-static-files.s3.amazonaws.com/premierleague/badges/t38.svg'
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
        name: 'Newcastle United',
        short_name: 'NEW',
        key_name: 'Newcastle',
        alias: [
            'newcastle',
            'magpies'
        ],
        badge: 'https://platform-static-files.s3.amazonaws.com/premierleague/badges/t4.svg'
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
