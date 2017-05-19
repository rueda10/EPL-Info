import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTeamNews } from '../actions/ajax_calls';

class TeamNews extends Component {
  constructor(props) {
    super(props);

    this.props.fetchTeamNews();
  }

  renderTeamNews() {
    const news = this.props.teamNews;
    const selectedClub = this.props.selectedClub;

    return news.map((headline) => {
      for (var i = 0; i < selectedClub.alias.length; i++) {
        if (headline.webTitle.toLowerCase().includes(selectedClub.alias[i].toLowerCase()) ||
            headline.webUrl.toLowerCase().includes(selectedClub.alias[i].toLowerCase())) {
              return (
                <div key={headline.webUrl}>
                  <h2 className="ui sub header">{headline.webTitle}</h2>
                  <div><a href={headline.webUrl} target="_blank">Read More...</a></div>
                </div>
              );
        }
      }
    });
  }

  render() {
    if (!this.props.selectedClub) {
      return <div></div>
    }
    if (!this.props.teamNews) {
      return (
        <div>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      )
    }

    return (
      <div className="ui fluid card">
        <div className="content card-header">
          <div className="header card-label">
            Team News
          </div>
        </div>
        <div className="content">
          {this.renderTeamNews()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedClub: state.activeClub,
    teamNews: state.teamNews
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTeamNews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamNews);
