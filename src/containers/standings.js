import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLeagueData } from '../actions/ajax_calls';

class Standings extends Component {
  constructor(props) {
    super(props);

    this.props.fetchLeagueData();
  }

  renderTable() {
    const selectedClub = this.props.club;
    const clubs = this.props.clubs;
    const leagueData = this.props.leagueData;

    return leagueData.map((team) => {
      var shortName;
      clubs.forEach(function(club, index) {
        if (team.teamName.toLowerCase() === club.name.toLowerCase()) {
          shortName = club.short_name;
        }
      });

      if (team.teamName.toLowerCase() === selectedClub.name.toLowerCase()) {
        return (
          <tr key={team.teamName} className="negative">
            <td className="center aligned">{team.position}</td>
            <td className="desktop-table">{shortName}</td>
            <td className="mobile-table">{team.teamName}</td>
            <td className="center aligned">{team.playedGames}</td>
            <td className="center aligned">{team.wins}</td>
            <td className="center aligned">{team.draws}</td>
            <td className="center aligned">{team.losses}</td>
            <td className="center aligned">{team.goals}</td>
            <td className="center aligned">{team.goalsAgainst}</td>
            <td className="center aligned">{team.goalDifference}</td>
            <td className="center aligned">{team.points}</td>
          </tr>
        );
      } else {
        return (
          <tr key={team.teamName}>
            <td className="center aligned">{team.position}</td>
            <td className="desktop-table">{shortName}</td>
            <td className="mobile-table">{team.teamName}</td>
            <td className="center aligned">{team.playedGames}</td>
            <td className="center aligned">{team.wins}</td>
            <td className="center aligned">{team.draws}</td>
            <td className="center aligned">{team.losses}</td>
            <td className="center aligned">{team.goals}</td>
            <td className="center aligned">{team.goalsAgainst}</td>
            <td className="center aligned">{team.goalDifference}</td>
            <td className="center aligned">{team.points}</td>
          </tr>
        );
      }

    });

  }

  render() {
    if (!this.props.club) {
      return <div></div>
    }
    if (!this.props.leagueData) {
      return (
        <div>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      )
    }

    return (
      <div className="ui fluid card">
        <div className="content card-header">
          <div className="header card-label">
            Standings
          </div>
        </div>
        <div className="content" id="standings-table">
          <table className="ui celled compact unstackable striped table">
            <thead>
              <tr>
                <th title="Position" className="center aligned">Pos</th>
                <th className="center aligned">Club</th>
                <th title="Matches Played" className="center aligned">P</th>
                <th title="Matches Won" className="center aligned">W</th>
                <th title="Matches Drawn" className="center aligned">D</th>
                <th title="Matches Lost" className="center aligned">L</th>
                <th title="Goals Scored" className="center aligned">GF</th>
                <th title="Goals Conceded" className="center aligned">GA</th>
                <th title="Goal Difference" className="center aligned">GD</th>
                <th title="Points" className="center aligned">Pts</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.activeClub,
    leagueData: state.leagueData,
    clubs: state.clubs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLeagueData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Standings);
