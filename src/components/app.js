import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchNews, fetchLeagueData, fetchPlayerData } from '../actions/ajax_calls';

import TeamNavBar from '../containers/team-nav-bar';
import TeamTitle from '../containers/team-title';
import PlayerNews from '../containers/player-news';
// import TeamNews from '../components/team-news';
import Standings from '../containers/standings';
// import TeamInformation from '../components/team-information';
// import PlayerInformation from '../containers/player-information';

export default class App extends Component {
  render() {
    return (
      <div>
        <TeamNavBar />
        <TeamTitle />
        <div className="ui three column stackable grid container">
          <div className="four wide column">
            <PlayerNews />
          </div>
          <div className="nine wide column">
            <Standings />
          </div>
        </div>
        {/* <TeamNews />
        <Standings />
        <TeamInformation />
        <PlayerInformation /> */}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   // Whatever is returned here will show up as props
//   // inside of ClubNavBar
//   return {
//     clubs: state.clubs
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchLeagueData, fetchNews, fetchPlayerData }, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
