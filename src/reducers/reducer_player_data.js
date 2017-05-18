import { FETCH_PLAYER_DATA } from '../actions/ajax_calls';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PLAYER_DATA:
      return action.payload.data;
  }

  return state;
}
