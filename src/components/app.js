import React, { Component } from 'react';

import TeamNavBar from '../containers/team-nav-bar';
import TeamTitle from '../containers/team-title';
import PlayerNews from '../containers/player-news';
import TeamNews from '../containers/team-news';
import Standings from '../containers/standings';
import TeamStats from '../containers/team-stats';
import PlayerInfo from '../containers/player-info';

export default class App extends Component {
    render() {
        return (
            <div>
                <TeamNavBar />
                <TeamTitle />
                <div className="ui three column stackable grid container">
                    <div className="five wide column">
                        <PlayerNews />
                        <PlayerInfo />
                    </div>
                    <div className="seven wide column">
                        <Standings />
                    </div>
                    <div className="four wide column">
                        <TeamNews />
                        <TeamStats />
                    </div>
                </div>
            </div>
        );
    }
}
