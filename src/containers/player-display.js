import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, List, Image, Header } from 'semantic-ui-react';
import PlayerStat from '../components/player-stat';

const PHOTOS_URL = 'https://ismdj.scdn5.secure.raxcdn.com/static/plfpl/img/shirts/photos/';

class DisplayPlayer extends Component {
  constructor(props) {
    super(props);

  }

  renderPlayerData() {
    const player = this.props.activePlayer;

    let position;
    let playerInfo;
    let squadNumber = player.squad_number;
    let games = Math.round(player.minutes / 90);
    let minutesPlayersContent = `${player.minutes} (${games} Games)`;

    const { element_type } = player;
    playerInfo = (
      <List>
        <PlayerStat label="Minutes" content={minutesPlayersContent} />
        { element_type === 1 && <PlayerStat label="Saves" content={player.saves} /> }
        { element_type === 1 && <PlayerStat label="Penalties Saved" content={player.penalties_saved} /> }
        { (element_type === 1 || element_type === 2) && <PlayerStat label="Clean Sheets" content={player.clean_sheets} /> }
        { (element_type === 1 || element_type === 2) && <PlayerStat label="Goals Conceded" content={player.goals_conceded} /> }
        { (element_type === 2 || element_type === 3 || element_type === 4) && <PlayerStat label="Goals Scored" content={player.goals_scored} /> }
        { (element_type === 2 || element_type === 3 || element_type === 4) && <PlayerStat label="Penalties Missed" content={player.penalties_missed} /> }
        { (element_type === 2 || element_type === 3 || element_type === 4) && <PlayerStat label="Assists" content={player.assists} /> }
        <PlayerStat label="Own Goals" content={player.own_goals} />
        <PlayerStat label="Yellow Cards" content={player.yellow_cards} />
        <PlayerStat label="Red Cards" content={player.red_cards} />
        <PlayerStat label="Points Per Game" content={player.points_per_game} />
      </List>
    );

    // squad number
    if (squadNumber === null) {
      squadNumber = 'N/A';
    } else {
      squadNumber = `#${squadNumber}`;
    }

    // position
    if ( element_type === 1 ) { position = 'Goalkeeper'}
    else if ( element_type === 2) { position = 'Defender'}
    else if ( element_type === 3) { position = 'Midfielder'}
    else if ( element_type === 4) { position = 'Forward'}

    return (
      <div>
        <Header as="h2" icon textAlign="center">
          <Image shape='circular' src={PHOTOS_URL + player.photo} onError={this.handleImageError} />
          <Header.Content>
            {' '}{player.first_name} {player.second_name}
            <Header.Subheader>
              {position} {squadNumber}
            </Header.Subheader>
          </Header.Content>
        </Header>
        {playerInfo}
      </div>
    );

  }

  render() {
    if (!this.props.activePlayer) {
      return <div />
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
