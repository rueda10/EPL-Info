import { FETCH_LEAGUE_DATA } from '../actions/ajax_calls';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_LEAGUE_DATA:
      return action.payload.data.standing;
  }
  return state;
}
