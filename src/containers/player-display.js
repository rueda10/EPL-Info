import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, List, Image, Item } from 'semantic-ui-react';
import PlayerStat from '../components/player-stat';

const PHOTOS_URL = 'https://ismdj.scdn5.secure.raxcdn.com/static/plfpl/img/shirts/photos/';

class DisplayPlayer extends Component {
  constructor(props) {
    super(props);

  }

  renderPlayerData() {
    const player = this.props.activePlayer;
    var goalkeeperStats;

    var position;
    var playerInfo;
    var games = Math.round(player.minutes / 90);
    var minutesPlayersContent = `${player.minutes} (${games} Games)`;

    if (player.element_type === 1) {
      position = 'Goalkeeper';
      playerInfo = (
        <List>
          <PlayerStat label="Minutes" content={minutesPlayersContent} />
          <PlayerStat label="Saves" content={player.saves} />
          <PlayerStat label="Penalties Saved" content={player.penalties_saved} />
          <PlayerStat label="Clean Sheets" content={player.clean_sheets} />
          <PlayerStat label="Goals Conceded" content={player.goals_conceded} />
          <PlayerStat label="Own Goals" content={player.own_goals} />
          <PlayerStat label="Yellow Cards" content={player.yellow_cards} />
          <PlayerStat label="Red Cards" content={player.red_cards} />
          <PlayerStat label="Points Per Game" content={player.points_per_game} />
        </List>
      )
    } else if (player.element_type === 2) {
      position = 'Defender';
      playerInfo = (
        <List>
          <PlayerStat label="Minutes" content={minutesPlayersContent} />
          <PlayerStat label="Clean Sheets" content={player.clean_sheets} />
          <PlayerStat label="Goals Conceded" content={player.goals_conceded} />
          <PlayerStat label="Own Goals" content={player.own_goals} />
          <PlayerStat label="Goals Scored" content={player.goals_scored} />
          <PlayerStat label="Penalties Missed" content={player.penalties_missed} />
          <PlayerStat label="Assists" content={player.assists} />
          <PlayerStat label="Yellow Cards" content={player.yellow_cards} />
          <PlayerStat label="Red Cards" content={player.red_cards} />
          <PlayerStat label="Points Per Game" content={player.points_per_game} />
        </List>
      )
    } else if (player.element_type === 3) {
      position = 'Midfielder';
      playerInfo = (
        <List>
          <PlayerStat label="Minutes" content={minutesPlayersContent} />
          <PlayerStat label="Goals Scored" content={player.goals_scored} />
          <PlayerStat label="Penalties Missed" content={player.penalties_missed} />
          <PlayerStat label="Assists" content={player.assists} />
          <PlayerStat label="Own Goals" content={player.own_goals} />
          <PlayerStat label="Yellow Cards" content={player.yellow_cards} />
          <PlayerStat label="Red Cards" content={player.red_cards} />
          <PlayerStat label="Points Per Game" content={player.points_per_game} />
        </List>
      )
    } else if (player.element_type === 4) {
      position = 'Forward';
      playerInfo = (
        <List>
          <PlayerStat label="Minutes" content={minutesPlayersContent} />
          <PlayerStat label="Goals Scored" content={player.goals_scored} />
          <PlayerStat label="Penalties Missed" content={player.penalties_missed} />
          <PlayerStat label="Assists" content={player.assists} />
          <PlayerStat label="Own Goals" content={player.own_goals} />
          <PlayerStat label="Yellow Cards" content={player.yellow_cards} />
          <PlayerStat label="Red Cards" content={player.red_cards} />
          <PlayerStat label="Points Per Game" content={player.points_per_game} />
        </List>
      )
    }

    var squadNumber = player.squad_number;
    if (squadNumber === null) {
      squadNumber = 'N/A';
    } else {
      squadNumber = `#${squadNumber}`;
    }

    return (
      <div>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' className="rounded" src={PHOTOS_URL + player.photo} onError={this.handleImageError} />

            <Item.Content verticalAlign="bottom">
              <Item.Header>{player.first_name} {player.second_name}</Item.Header>
              <Item.Meta>{position}</Item.Meta>
              <Item.Meta>{squadNumber}</Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
        {playerInfo}
      </div>
    );

  }

  render() {
    if (!this.props.activePlayer) {
      return <div></div>
    }

    return (
      <div id="player-display">
        {this.renderPlayerData()}
      </div>
    );
  }

  handleImageError(e) {
    e.target.onerror = null;
    e.target.src = '../../images/avatar.jpg';
  }
}

function mapStateToProps(state) {
  return {
    activePlayer: state.activePlayer
  };
}

export default connect(mapStateToProps)(DisplayPlayer);
