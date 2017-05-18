import { combineReducers } from 'redux';
import ClubsReducer from "./reducer_clubs";
import ActiveClub from "./reducer_active_club";
import LeagueDataReducer from './reducer_league_data';
import NewsReducer from './reducer_news';
import PlayersReducer from './reducer_player_data';

const rootReducer = combineReducers({
  clubs: ClubsReducer,
  activeClub: ActiveClub,
  leagueData: LeagueDataReducer,
  news: NewsReducer,
  players: PlayersReducer
});

export default rootReducer;
