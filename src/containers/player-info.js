import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPlayerData} from '../actions/ajax_calls';
import {selectPlayer} from '../actions/select_player';
import {Dropdown, Dimmer, Loader, Card} from 'semantic-ui-react'

import DisplayPlayer from './player-display';

const PHOTOS_URL = 'https://ismdj.scdn5.secure.raxcdn.com/static/plfpl/img/shirts/photos/';

class PlayerInfo extends Component {
    static handleImageError(e) {
        if (e.type === "error") {
            e.target.onerror = null;
            e.target.src = '../../images/avatar.jpg';
        }
    }
    
    constructor(props) {
        super(props);
        this.props.fetchPlayerData();
        this.onPlayerItemClick = this.onPlayerItemClick.bind(this);
    }
    
    renderRoster() {
        const teams = this.props.players.teams;
        const players = this.props.players.elements;
        const selectedClub = this.props.club;
        let teamId = -1;
        let goalKeeperOptions = [];
        let defenderOptions = [];
        let midfielderOptions = [];
        let forwardOptions = [];
        
        teams.forEach(function (team, index) {
            if (selectedClub.short_name.toLowerCase() === team.short_name.toLowerCase()) {
                teamId = team.code;
                return false;
            }
        });
        
        players.forEach(function (player, index) {
            if (teamId === player.team_code) {
                let squadNumber = player.squad_number;
                if (squadNumber === null) {
                    squadNumber = 'N/A';
                }
                
                const playerOption = {
                    num: squadNumber,
                    text: `#${squadNumber} ${player.first_name} ${player.second_name}`,
                    value: `${player.first_name} ${player.second_name}`,
                    image: {avatar: true, src: `${PHOTOS_URL}${player.photo}`},
                    data: player
                };
                
                if (player.element_type === 1) {
                    goalKeeperOptions.push(playerOption);
                    goalKeeperOptions.sort(function (a, b) {
                        return a.num - b.num;
                    });
                } else if (player.element_type === 2) {
                    defenderOptions.push(playerOption);
                    defenderOptions.sort(function (a, b) {
                        return a.num - b.num;
                    });
                } else if (player.element_type === 3) {
                    midfielderOptions.push(playerOption);
                    midfielderOptions.sort(function (a, b) {
                        return a.num - b.num;
                    });
                } else if (player.element_type === 4) {
                    forwardOptions.push(playerOption);
                    forwardOptions.sort(function (a, b) {
                        return a.num - b.num;
                    });
                }
            }
        });
        
        return (
            <Dropdown scrolling fluid text="Select Player">
                <Dropdown.Menu>
                    <Dropdown.Header content="Goalkeepers"/>
                    {goalKeeperOptions.map((player) => <Dropdown.Item key={player.value} image={player.image.src}
                                                                      content={player.text}
                                                                      onClick={() => this.onPlayerItemClick(player.data)}
                                                                      onError={PlayerInfo.handleImageError}/>)}
                    <Dropdown.Header content="Defenders"/>
                    {defenderOptions.map((player) => <Dropdown.Item key={player.value} image={player.image.src}
                                                                    content={player.text}
                                                                    onClick={() => this.onPlayerItemClick(player.data)}
                                                                    onError={PlayerInfo.handleImageError}/>)}
                    <Dropdown.Header content="Midfielders"/>
                    {midfielderOptions.map((player) => <Dropdown.Item key={player.value} image={player.image.src}
                                                                      content={player.text}
                                                                      onClick={() => this.onPlayerItemClick(player.data)}
                                                                      onError={PlayerInfo.handleImageError}/>)}
                    <Dropdown.Header content="Forwards"/>
                    {forwardOptions.map((player) => <Dropdown.Item key={player.value} image={player.image.src}
                                                                   content={player.text}
                                                                   onClick={() => this.onPlayerItemClick(player.data)}
                                                                   onError={PlayerInfo.handleImageError}/>)}
                </Dropdown.Menu>
            </Dropdown>
        );
        
    }
    
    onPlayerItemClick(data) {
        if (data) {
            this.props.selectPlayer(data);
        }
    }
    
    render() {
        if (!this.props.club) {
            return <div/>
        }
        if (!this.props.players) {
            return (
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
            )
        }
        
        return (
            <Card fluid>
                <Card.Content header='Team Roster'/>
                <Card.Content>
                    {this.renderRoster()}
                </Card.Content>
                <DisplayPlayer/>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        club: state.activeClub,
        players: state.players,
        clubs: state.leagueData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPlayerData, selectPlayer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
