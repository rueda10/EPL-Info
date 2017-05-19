import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

    var squadNumber = player.squad_number;
    if (squadNumber === null) {
      squadNumber = 'N/A';
    }

    return (
      <div className="ui items">
        <div className="item">
          <div className="ui tiny rounded image">
            <img src={PHOTOS_URL + player.photo} onError={this.handleImageError}/>
          </div>
          <div className="content">
            <a className="header">{player.first_name} {player.second_name}</a>
            <div className="meta">
              <span>#{squadNumber} - {position}</span>
            </div>
            <div className="description">
              <p></p>
            </div>
            <div className="extra">
              Additional Details
            </div>
          </div>
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
