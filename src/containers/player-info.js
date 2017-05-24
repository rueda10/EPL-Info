import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPlayerData } from '../actions/ajax_calls';
import { selectPlayer } from '../actions/select_player';
import { Dropdown } from 'semantic-ui-react'

import DisplayPlayer from './player-display';

const PHOTOS_URL = 'https://ismdj.scdn5.secure.raxcdn.com/static/plfpl/img/shirts/photos/';

class PlayerInfo extends Component {
  constructor(props) {
    super(props);
    this.props.fetchPlayerData();
    this.onPlayerChange = this.onPlayerChange.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
  }

  renderRoster() {
    const teams = this.props.players.teams;
    const players = this.props.players.elements;
    const selectedClub = this.props.club;
    var teamId = -1;
    var goalKeeperOptions = [];
    var defenderOptions = [];
    var midfielderOptions = [];
    var forwardOptions = [];

    teams.forEach(function(team, index) {
      if (selectedClub.short_name.toLowerCase() === team.short_name.toLowerCase()) {
        teamId = team.code;
        return false;
      }
    });

    players.forEach(function(player, index) {
      if (teamId === player.team_code) {
        var squadNumber = player.squad_number;
        if (squadNumber === null) {
          squadNumber = 'N/A';
        }

        const playerOption = {
          num: squadNumber,
          text: `#${squadNumber} ${player.first_name} ${player.second_name}`,
          value: `${player.first_name} ${player.second_name}`,
          image: { avatar: true, src: `${PHOTOS_URL}${player.photo}` },
          data: player
        }

        if (player.element_type === 1) {
          goalKeeperOptions.push(playerOption);
          goalKeeperOptions.sort(function(a, b) {
            return a.num - b.num;
          });
        } else if (player.element_type === 2) {
          defenderOptions.push(playerOption);
          defenderOptions.sort(function(a, b) {
            return a.num - b.num;
          });
        } else if (player.element_type === 3) {
          midfielderOptions.push(playerOption);
          midfielderOptions.sort(function(a, b) {
            return a.num - b.num;
          });
        } else if (player.element_type === 4) {
          forwardOptions.push(playerOption);
          forwardOptions.sort(function(a, b) {
            return a.num - b.num;
          });
        }

      }
    });

    return (
      <div>
        <Dropdown onChange={this.onPlayerChange} onError={this.handleImageError} text='Select Goalkeeper' fluid selection options={goalKeeperOptions} />
        <Dropdown onChange={this.onPlayerChange} onError={this.handleImageError} text='Select Defender' fluid selection options={defenderOptions} />
        <Dropdown onChange={this.onPlayerChange} onError={this.handleImageError} text='Select Midfielder' fluid selection options={midfielderOptions} />
        <Dropdown onChange={this.onPlayerChange} onError={this.handleImageError} text='Select Forward' fluid selection options={forwardOptions} />
        <DisplayPlayer />
      </div>
    );

  }

  handleImageError(e) {
    e.target.src = '../../images/avatar.jpg';
  }

  onPlayerChange(e, data) {
    const playerName = data.value;
    var playerObject;
    data.options.forEach(function(player, index) {
      if (player.value === data.value) {
        playerObject = player.data;
        return false;
      }
    });

    if (playerObject) {
      this.props.selectPlayer(playerObject);
    }

    data.value = "Select Player";
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
          <div className="header card-label">
            Team Roster
          </div>
        </div>
        <div className="content">
          {this.renderRoster()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.activeClub,
    players: state.players,
    clubs: state.leagueData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlayerData, selectPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
