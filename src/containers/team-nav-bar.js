import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectClub } from '../actions/index';
import { bindActionCreators } from 'redux';

class ClubNavBar extends Component {
  renderNavBar() {
    return this.props.clubs.map((club) => {
      return (
        <div
          onClick={() => this.props.selectClub(club)}
          key={club.key_name}
          className="item">
            <img className="badge-icon" id={club.short_name} src={club.badge} />
        </div>
      );
    });
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
  return bindActionCreators({ selectClub: selectClub }, dispatch);
}

// promote ClubNavBar from a component to a container - it needs
// to know about this new dispatch method, selectClub. Make it
// available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ClubNavBar);
