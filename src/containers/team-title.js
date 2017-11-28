import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

class TeamTitle extends Component {
    renderNextMatch() {
        let nextMatch = '';

        if (this.props.teamData) {
            const currentTeam = this.props.teamData.teams.filter((team) => {
                return team.short_name === this.props.club.short_name;
            })[0];

            if (currentTeam) {
                const opponent = this.props.teamData.teams.filter((opponentTeam) => {
                   return currentTeam.next_event_fixture[0].opponent === opponentTeam.id;
                })[0];
                const location = currentTeam.next_event_fixture[0].is_home ? "home to " : "away at ";

                nextMatch = `Next match: ${location} ${opponent.name}`;
            }
        }

        return (
            <Header.Subheader textAlign='center'>
                { nextMatch }
            </Header.Subheader>
        );
    }

    render() {
        if (!this.props.club) {
            return <div />
        }

        return (
            <Header as='h1' textAlign='center'>
                {this.props.club.name.toUpperCase()}
                {this.renderNextMatch()}
            </Header>
        );
    }
}

function mapStateToProps(state) {
    return {
        club: state.activeClub,
        teamData: state.players
    }
}

export default connect(mapStateToProps)(TeamTitle);
