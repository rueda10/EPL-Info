import { combineReducers } from 'redux';
import ActiveClub from "./reducer_active_club";
import ActivePlayer from "./reducer_active_player";
import LeagueDataReducer from './reducer_league_data';
import NewsReducer from './reducer_news';
import PlayersReducer from './reducer_player_data';

const rootReducer = combineReducers({
  activeClub: ActiveClub,
  activePlayer: ActivePlayer,
  leagueData: LeagueDataReducer,
  teamNews: NewsReducer,
  players: PlayersReducer
});

export default rootReducer;
