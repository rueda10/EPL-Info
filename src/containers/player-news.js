import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerNews extends Component {
  render() {
    if (!this.props.club) {
      return <div>Select a club to get started.</div>
    }

    return (
      <div>{this.props.club.name}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.activeClub
  };
}

export default connect(mapStateToProps)(PlayerNews);
