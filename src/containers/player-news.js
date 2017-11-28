import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPlayerData } from '../actions/ajax_calls';
import { selectPlayer } from '../actions/select_player';
import { Dimmer, Loader, Card, Item, List } from 'semantic-ui-react'

const PHOTOS_URL = 'https://ismdj.scdn5.secure.raxcdn.com/static/plfpl/img/shirts/photos/';

class PlayerNews extends Component {
  static handleImageError(e) {
      e.target.onerror = null;
      e.target.src = '../../images/avatar.jpg';
  }

  constructor(props) {
    super(props);

    this.props.fetchPlayerData();
  }

  renderPlayerData() {
    const teams = this.props.players.teams;
    const players = this.props.players.elements;
    const selectedClub = this.props.club;
    let teamId = -1;

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
            <Item key={player.code}>
              <Item.Image src={PHOTOS_URL + player.photo} shape="rounded" size="mini" onError={this.handleImageError} verticalAlign="middle" ui centered bordered />
              <Item.Content>
                <Item.Header onClick={() => this.props.selectPlayer(player)}>{player.first_name} {player.second_name}</Item.Header>
                <Item.Description>{player.news}</Item.Description>
              </Item.Content>
            </Item>
          );
        }
      }
    });

  }

  render() {
    if (!this.props.club) {
      return <div />
    }
    if (!this.props.players) {
      return (
        <Dimmer active inverted>
          <Loader>Loading</Loader>
        </Dimmer>
      )
    }

    let playerDataCells = this.renderPlayerData();

    if (playerDataCells.every((element) =>  { return element === undefined})) {
      playerDataCells = (
        <List.Item key="nonews">
          <List.Header className="no-content">No Injuries / Suspensions</List.Header>
        </List.Item>
      )
    }

    return (
      <Card fluid>
        <Card.Content header='Injuries / Suspensions' />
        <Card.Content>
          <List celled>
            {playerDataCells}
          </List>
        </Card.Content>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerNews);
