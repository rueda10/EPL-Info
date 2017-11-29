import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Dimmer, Loader, Card, Table} from 'semantic-ui-react'
import {fetchLeagueData} from '../actions/ajax_calls';

class Standings extends Component {
    constructor(props) {
        super(props);
        
        this.props.fetchLeagueData();
    }
    
    renderTable() {
        const selectedClub = this.props.club;
        
        const sortedTable = Array.prototype.slice.call(this.props.leagueData).sort(function (a, b) {
            return a.position - b.position;
        });
        
        return sortedTable.map((team) => {
            const className = `${team.name === selectedClub.name ? 'negative' : ''}`;
            
            return (
                <Table.Row key={team.name} className={className}>
                    <Table.Cell textAlign="center">{team.position}</Table.Cell>
                    <Table.Cell className="desktop-table">{team.short_name}</Table.Cell>
                    <Table.Cell className="mobile-table">{team.name}</Table.Cell>
                    <Table.Cell textAlign="center">{team.playedGames}</Table.Cell>
                    <Table.Cell textAlign="center">{team.wins}</Table.Cell>
                    <Table.Cell textAlign="center">{team.draws}</Table.Cell>
                    <Table.Cell textAlign="center">{team.losses}</Table.Cell>
                    <Table.Cell textAlign="center">{team.goals}</Table.Cell>
                    <Table.Cell textAlign="center">{team.goalsAgainst}</Table.Cell>
                    <Table.Cell textAlign="center">{team.goalDifference}</Table.Cell>
                    <Table.Cell textAlign="center">{team.points}</Table.Cell>
                </Table.Row>
            );
        });
        
    }
    
    render() {
        if (!this.props.club) {
            return <div/>
        }
        if (!this.props.leagueData) {
            return (
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
            )
        }
        
        return (
            <Card fluid>
                <Card.Content header='Standings'/>
                <Card.Content>
                    <Table celled compact unstackable striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center" title="Position">Pos</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Club</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Matches Played">P</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Matches Won">W</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Matches Drawn">D</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Matches Lost">L</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Goals Scored">GS</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Goals Against">GA</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Goal Difference">GD</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" title="Points">Pts</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderTable()}
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        club: state.activeClub,
        leagueData: state.leagueData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchLeagueData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Standings);
