import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimmer, Loader, Card, Item, List, Accordion} from 'semantic-ui-react';

class TeamStats extends Component {
    constructor(props) {
        super(props);
    }
    
    getHomeFormContent() {
        if (this.props.leagueData) {
            const team = this.props.leagueData.filter((item) => {
                return item.key_name === this.props.selectedClub.key_name;
            })[0];
        
            if (!team.home) {
                return null;
            }
        
            const content = (
                <Item>
                    <Item.Description>Wins <span className="team-stat-value">{team.home.wins}</span></Item.Description>
                    <Item.Description>Losses <span
                        className="team-stat-value">{team.home.losses}</span></Item.Description>
                    <Item.Description>Draws <span
                        className="team-stat-value">{team.home.draws}</span></Item.Description>
                    <Item.Description>Goals For <span
                        className="team-stat-value">{team.home.goals}</span></Item.Description>
                    <Item.Description>Goals Against <span
                        className="team-stat-value">{team.home.goalsAgainst}</span></Item.Description>
                </Item>
            );
        
            return {
                title: "Home Form",
                content
            };
        }
    
        return null;
    }
    
    getAwayFormContent() {
        if (this.props.leagueData) {
            const team = this.props.leagueData.filter((item) => {
                return item.key_name === this.props.selectedClub.key_name;
            })[0];
            
            if (!team.away) {
                return null;
            }
            
            const content = (
                <Item>
                    <Item.Description>Wins <span className="team-stat-value">{team.away.wins}</span></Item.Description>
                    <Item.Description>Losses <span
                        className="team-stat-value">{team.away.losses}</span></Item.Description>
                    <Item.Description>Draws <span
                        className="team-stat-value">{team.away.draws}</span></Item.Description>
                    <Item.Description>Goals For <span
                        className="team-stat-value">{team.away.goals}</span></Item.Description>
                    <Item.Description>Goals Against <span
                        className="team-stat-value">{team.away.goalsAgainst}</span></Item.Description>
                </Item>
            );
            
            return {
                title: "Away Form",
                content
            };
        }
        
        return null;
    }
    
    getTopScorersContent(teamId, players) {
        const currentTeamPlayers = players.filter((player) => {
            return teamId === player.team_code;
        }).sort((a, b) => {
            if (a.goals_scored < b.goals_scored) {
                return 1;
            }
            else if (a.goals_scored === b.goals_scored) {
                return 0;
            }
            else {
                return -1;
            }
        });
    
        const topScorers = currentTeamPlayers.map((player) => {
            if (player.goals_scored > 0) {
                return <Item.Description key={`${player.id} goals scored`}>{player.first_name} {player.second_name}
                    <span className="team-stat-value">{player.goals_scored}</span></Item.Description>
            }
        });
        
        const content = (
            <Item>
                {topScorers.every((element) => {
                    return element === undefined
                }) ? 'No scorers' : topScorers}
            </Item>
        );
        
        return {
            title: "Top Scorers",
            content
        }
    }
    
    getTopAssistsContent(teamId, players) {
        const currentTeamPlayers = players.filter((player) => {
            return teamId === player.team_code;
        }).sort((a, b) => {
            if (a.assists < b.assists) {
                return 1;
            }
            else if (a.assists === b.assists) {
                return 0;
            }
            else {
                return -1;
            }
        });
    
        const topAssists = currentTeamPlayers.map((player) => {
            if (player.assists > 0) {
                return <Item.Description key={`${player.id} goals assisted`}>{player.first_name} {player.second_name}
                    <span className="team-stat-value">{player.assists}</span></Item.Description>
            }
        });
        
        const content = (
            <Item>
                {topAssists.every((element) => {
                    return element === undefined
                }) ? 'No assisters' : topAssists}
            </Item>
        );
    
        return {
            title: "Top Assists",
            content
        }
    }
    
    getTopPointsPerGameContent(teamId, players) {
        const currentTeamPlayers = players.filter((player) => {
            return teamId === player.team_code;
        }).sort((a, b) => {
            if (a.points_per_game < b.points_per_game) {
                return 1;
            }
            else if (a.points_per_game === b.points_per_game) {
                return 0;
            }
            else {
                return -1;
            }
        });
    
        const topPointsPerGame = currentTeamPlayers.map((player) => {
            if (player.points_per_game > 0) {
                return <Item.Description key={`${player.id} points per game`}>{player.first_name} {player.second_name}
                    <span className="team-stat-value">{player.points_per_game}</span></Item.Description>
            }
        });
        
        const content = (
            <Item>
                {topPointsPerGame.every((element) => {
                    return element === undefined
                }) ? 'No players with points' : topPointsPerGame}
            </Item>
        );
        
        return {
            title: 'Top Points per Game',
            content
        }
    }
    
    getLeastGoalsConcededContent(teamId, players) {
        const currentTeamPlayers = players.filter((player) => {
            return teamId === player.team_code && (player.element_type === 1 || player.element_type === 2);
        }).sort((a, b) => {
            if (a.goals_conceded < b.goals_conceded) {
                return 1;
            }
            else if (a.goals_conceded === b.goals_conceded) {
                return 0;
            }
            else {
                return -1;
            }
        }).reverse();
    
        const leastGoalsConceded = currentTeamPlayers.filter((player) => {
            return player.points_per_game > 0;
        }).map((player) => {
            return <Item.Description key={`${player.id} goals conceded`}>{player.first_name} {player.second_name} <span
                className="team-stat-value">{player.goals_conceded}</span></Item.Description>
        });
        
        const content = (
            <Item>
                {leastGoalsConceded.every((element) => {
                    return element === undefined
                }) ? 'No players' : leastGoalsConceded}
            </Item>
        );
        
        return {
            title: 'Least Goals Conceded',
            content
        }
    }
    
    render() {
        if (!this.props.selectedClub) {
            return <div/>;
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
        
        const {players, selectedClub} = this.props;
        const {teams} = players;
        
        let teamId = -1;
        
        teams.forEach(function (team, index) {
            if (selectedClub.short_name.toLowerCase() === team.short_name.toLowerCase()) {
                teamId = team.code;
                return false;
            }
        });
        
        const homeForm = this.getHomeFormContent();
        const awayForm = this.getAwayFormContent();
        const topScorers = this.getTopScorersContent(teamId, players.elements);
        const topAssists = this.getTopAssistsContent(teamId, players.elements);
        const topPointsPerGame = this.getTopPointsPerGameContent(teamId, players.elements);
        const leastGoalsConceded = this.getLeastGoalsConcededContent(teamId, players.elements);
        let panels = [];
        if (homeForm) {
            panels.push(homeForm);
            panels.push(awayForm);
            panels.push(topScorers);
            panels.push(topAssists);
            panels.push(topPointsPerGame);
            panels.push(leastGoalsConceded);
        }
        
        return (
            <Card fluid>
                <Card.Content header='Team Statistics'/>
                <Card.Content>
                    <Accordion defaultActiveIndex={[0, 1]} panels={panels} exclusive={false} styled />
                </Card.Content>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedClub: state.activeClub,
        players: state.players,
        leagueData: state.leagueData
    };
}

export default connect(mapStateToProps)(TeamStats);