export function selectPlayer(player) {
    // selectClub is an ActionCreator, it needs to return an
    // action, and object with a type property
    return {
        type: 'PLAYER_SELECTED',
        payload: player
    };
}
