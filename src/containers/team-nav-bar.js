import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectClub } from '../actions/select_club';
import { selectPlayer } from '../actions/select_player';
import { Menu, Popup } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';

class ClubNavBar extends Component {
  constructor(props) {
    super(props);

    this.onBadgeClick = this.onBadgeClick.bind(this);
    this.props.selectClub(this.props.clubs[0]);
    this.state = {
      activeItem: 'ARS'
    }
  }

  renderNavBar() {
    const { activeItem } = this.state;
    const style = {
      borderRadius: 0,
      padding: '0em',
    }

    return this.props.clubs.map((club) => {
      return (
        <Menu.Item
            onClick={this.onBadgeClick.bind(this, club)}
            name={club.short_name}
            active={activeItem === club.short_name}>
          <img className="badge-icon" id={club.short_name} src={club.badge} />
        </Menu.Item>
      );
    });
  }

  onBadgeClick(club) {
    this.props.selectClub(club);
    this.props.selectPlayer(null);
    this.setState({
      activeItem: club.short_name
    });
  }

  render() {
    return (
      <div className="nav-container">
        <Menu pointing secondary>
            {this.renderNavBar()}
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned here will show up as props
  // inside of ClubNavBar
  return {
    clubs: state.leagueData
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
