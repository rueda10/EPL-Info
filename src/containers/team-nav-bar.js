import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectClub } from '../actions/select_club';
import { selectPlayer } from '../actions/select_player';
import { bindActionCreators } from 'redux';

class ClubNavBar extends Component {
  constructor(props) {
    super(props);

    this.onBadgeClick = this.onBadgeClick.bind(this);
    this.props.selectClub(this.props.clubs[0]);
  }

  renderNavBar() {
    return this.props.clubs.map((club) => {
      return (
        <div
          onClick={this.onBadgeClick.bind(this, club)}
          key={club.key_name}
          className="item"
          title={club.name}>
            <img className="badge-icon" id={club.short_name} src={club.badge} />
        </div>
      );
    });
  }

  onBadgeClick(club) {
    this.props.selectClub(club);
    this.props.selectPlayer(null);
  }

  render() {
    return (
      <div id="nav-container">
        <nav className="ui secondary pointing menu" id="club-navbar">
          {this.renderNavBar()}
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned here will show up as props
  // inside of ClubNavBar
  return {
    clubs: state.clubs
  }
}

// Anything returned from this function will end up as props
// on the ClubNavBar container
function mapDispatchToProps(dispatch) {
  // Whenever selectClub is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ selectClub, selectPlayer }, dispatch);
}

// promote ClubNavBar from a component to a container - it needs
// to know about this new dispatch method, selectClub. Make it
// available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ClubNavBar);
