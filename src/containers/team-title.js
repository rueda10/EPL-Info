import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TeamTitle extends Component {
  render() {
    if (!this.props.club) {
      return <div></div>
    }

    return (
      <h1 className="ui center aligned header">
        {this.props.club.name.toUpperCase()}
      </h1>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.activeClub
  }
}

export default connect(mapStateToProps)(TeamTitle);
