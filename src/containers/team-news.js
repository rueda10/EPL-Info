import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Dimmer, Loader, Card, List} from 'semantic-ui-react';

import {fetchTeamNews} from '../actions/ajax_calls';

class TeamNews extends Component {
    constructor(props) {
        super(props);
        
        this.props.fetchTeamNews();
    }
    
    renderTeamNews() {
        const news = this.props.teamNews;
        const selectedClub = this.props.selectedClub;
        
        return news.map((headline) => {
            for (let i = 0; i < selectedClub.alias.length; i++) {
                if (headline.webTitle.toLowerCase().includes(selectedClub.alias[i].toLowerCase()) ||
                    headline.webUrl.toLowerCase().includes(selectedClub.alias[i].toLowerCase())) {
                    return (
                        <List.Item key={headline.webUrl}>
                            <List.Description>{headline.webTitle}</List.Description>
                            <div><a href={headline.webUrl} target="_blank">Read More...</a></div>
                        </List.Item>
                    );
                }
            }
        });
    }
    
    render() {
        if (!this.props.selectedClub) {
            return <div/>;
        }
        if (!this.props.teamNews) {
            return (
                <div>
                    <Dimmer active inverted>
                        <Loader>Loading</Loader>
                    </Dimmer>
                </div>
            );
        }
        
        let newsCells = this.renderTeamNews();
        
        if (newsCells.every((element) => {
                return element === undefined
            })) {
            newsCells = (
                <List.Item key="nonews">
                    <List.Header className="no-content">No News</List.Header>
                </List.Item>
            )
        }
        
        return (
            <Card fluid>
                <Card.Content header='Team News'/>
                <Card.Content>
                    <List celled>
                        {newsCells}
                    </List>
                </Card.Content>
            </Card>
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
    return bindActionCreators({fetchTeamNews}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamNews);
