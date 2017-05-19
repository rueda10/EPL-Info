import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPlayerData } from '../actions/ajax_calls';
import { selectPlayer } from '../actions/select_player';

const PHOTOS_URL = 'https://ismdj.scdn5.secure.raxcdn.com/static/plfpl/img/shirts/photos/';

class PlayerNews extends Component {
  constructor(props) {
    super(props);

    this.props.fetchPlayerData();
  }

  renderPlayerData() {
    const teams = this.props.players.teams;
    const players = this.props.players.elements;
    const selectedClub = this.props.club;
    var teamId = -1;

    teams.forEach(function(team, index) {
      if (selectedClub.short_name.toLowerCase() === team.short_name.toLowerCase()) {
        teamId = team.code;
        return false;
      }
    });

    return players.map((player) => {
      if (teamId === player.team_code) {
        if (player.status === "i" || player.status === "d" || player.status === "s") {
          return (
            <div key={player.code} className="item">
              <img className="ui mini rounded image" src={PHOTOS_URL + player.photo} onError={this.handleImageError}/>
              <div className="content">
                <a className="header" onClick={() => this.props.selectPlayer(player)}>{player.first_name} {player.second_name}</a>
                <div className="description">{player.news}</div>
              </div>
            </div>
          );
        }
      }
    });

  }

  handleImageError(e) {
    e.target.src = '../../images/avatar.jpg';
  }

  render() {
    if (!this.props.club) {
      return <div></div>
    }
    if (!this.props.players) {
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
          <div className="header card-label green">
            Injuries / Suspensions
          </div>
        </div>
        <div className="content" id="player-news">
          <div className="ui celled list">
            {this.renderPlayerData()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.activeClub,
    players: state.players,
    clubs: state.clubs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlayerData, selectPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerNews);
