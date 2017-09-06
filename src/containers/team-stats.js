import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimmer, Loader, Card, Item, List } from 'semantic-ui-react';

class TeamStats extends Component {
    constructor(props) {
        super(props);
    }

    renderTopScorers(teamId, players) {
        const currentTeamPlayers = players.filter((player) => {
            return teamId === player.team_code;
        }).sort((a, b) => {
            if (a.goals_scored < b.goals_scored) { return 1; }
            else if (a.goals_scored === b.goals_scored) { return 0; }
            else { return -1; }
        });

        const topScorers = currentTeamPlayers.slice(0, 5).map((player) => {
            if (player.goals_scored > 0) {
                return <Item.Description key={`${player.id} goals scored`}>{player.first_name} {player.second_name} <span className="team-stat-value">{player.goals_scored}</span></Item.Description>
            }
        })

        return (
            <Item>
                <Item.Header>Top Scorer(s)</Item.Header>
                { topScorers.every((element) =>  { return element === undefined}) ? 'No scorers' : topScorers }
            </Item>
        )
    }

    renderTopAssisters(teamId, players) {
        const currentTeamPlayers = players.filter((player) => {
            return teamId === player.team_code;
        }).sort((a, b) => {
            if (a.assists < b.assists) { return 1; }
            else if (a.assists === b.assists) { return 0; }
            else { return -1; }
        });

        console.log(currentTeamPlayers);

        const topAssisters = currentTeamPlayers.slice(0, 5).map((player) => {
            if (player.assists > 0) {
                return <Item.Description key={`${player.id} goals assisted`}>{player.first_name} {player.second_name} <span className="team-stat-value">{player.assists}</span></Item.Description>
            }
        })

        return (
            <Item>
                <Item.Header>Top Assists</Item.Header>
                { topAssisters.every((element) =>  { return element === undefined}) ? 'No assisters' : topAssisters }
            </Item>
        )
    }

    render() {
        if (!this.props.selectedClub) {
            return <div></div>;
        }
        if (!this.props.players) {
            return (
                <div>
                    <Dimmer active inverted>
                        <Loader>Loading</Loader>
                    </Dimmer>
                </div>
            );
        }

        const { players, selectedClub } = this.props;
        const { teams } = players;

        var teamId = -1;

        teams.forEach(function(team, index) {
            if (selectedClub.short_name.toLowerCase() === team.short_name.toLowerCase()) {
                teamId = team.code;
                return false;
            }
        });

        return (
            <Card fluid>
                <Card.Content header='Team Stats' />
                <Card.Content>
                    <List celled>
                        {this.renderTopScorers(teamId, players.elements)}
                        {this.renderTopAssisters(teamId, players.elements)}
                    </List>
                </Card.Content>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedClub: state.activeClub,
        players: state.players
    };
}

export default connect(mapStateToProps)(TeamStats);