import {FETCH_TEAM_NEWS} from '../actions/ajax_calls';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_TEAM_NEWS:
            return action.payload.data.response.results;
    }
    return state;
}
