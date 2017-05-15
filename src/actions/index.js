export function selectClub(club) {
  // selectClub is an ActionCreator, it needs to return an
  // action, and object with a type property
  return {
    type: 'CLUB_SELECTED',
    payload: club
  };
}
