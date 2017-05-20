import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, List } from 'semantic-ui-react'

import AlternateImage from '../components/alternate-image';

const PHOTOS_URL = 'https://ismdj.scdn5.secure.raxcdn.com/static/plfpl/img/shirts/photos/';

class DisplayPlayer extends Component {
  constructor(props) {
    super(props);

  }

  renderPlayerData() {
    const player = this.props.activePlayer;

    var position;
    if (player.element_type === 1) {
      position = 'Goalkeeper';
    } else if (player.element_type === 2) {
      position = 'Defender';
    } else if (player.element_type === 3) {
      position = 'Midfielder';
    } else if (player.element_type === 4) {
      position = 'Forward';
    }

    var playerInfo = (
        <List>
          <List.Item as='div'>
            <Icon name='right triangle' />
            <List.Content>
              <List.Header>Goals Scored: {player.goals_scored}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item as='div'>
            <Icon name='right triangle' />
            <List.Content>
              <List.Header>Assists: {player.assists}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item as='div'>
            <Icon name='right triangle' />
            <List.Content>
              <List.Header>Yellow Cards: {player.yellow_cards}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item as='div'>
            <Icon name='right triangle' />
            <List.Content>
              <List.Header>Red Cards: {player.red_cards}</List.Header>
            </List.Content>
          </List.Item>
        </List>
    );

    var squadNumber = player.squad_number;
    if (squadNumber === null) {
      squadNumber = 'N/A';
    } else {
      squadNumber = `#${squadNumber}`;
    }

    return (
      <div>
        <div className="ui items">
          <div className="item">
            <div className="ui tiny rounded image">
              <img className="player-display-pic" src={PHOTOS_URL + player.photo} onError={this.handleImageError}/>
            </div>
            <div className="middle aligned content">
              <a className="header">{player.first_name} {player.second_name}</a>
              <div className="meta">
                <div>{position}</div>
                <div>{squadNumber}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {playerInfo}
        </div>
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
    e.target.src = '../../images/avatar.jpg';
  }
}

function mapStateToProps(state) {
  return {
    activePlayer: state.activePlayer
  };
}

export default connect(mapStateToProps)(DisplayPlayer);
