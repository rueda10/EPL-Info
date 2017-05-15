import React from 'react';
import { Component } from 'react';

import TeamNavBar from '../containers/team-nav-bar';
import PlayerNews from '../containers/player-news';
// import TeamNews from '../components/team-news';
// import Standings from '../components/standings';
// import TeamInformation from '../components/team-information';
// import PlayerInformation from '../containers/player-information';

export default class App extends Component {
  render() {
    return (
      <div>
        <TeamNavBar />
        <PlayerNews />
        {/* <TeamNews />
        <Standings />
        <TeamInformation />
        <PlayerInformation /> */}
      </div>
    );
  }
}
