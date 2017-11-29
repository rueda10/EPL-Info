import React, {Component} from 'react';

export default class AlternateImage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            classes: this.props.classes,
            src: this.props.src
        }
    }
    
    onError() {
        this.setState({
            src: '../../images/avatar.jpg'
        });
    }
    
    render() {
        return (
            <img className={this.state.classes} src={this.state.src} onError={this.onError.bind(this)}/>
        );
    }
}
