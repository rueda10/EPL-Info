import React, {Component} from 'react';
import {Icon, List} from 'semantic-ui-react'

export default (props) => {
    return (
        <div>
            <Icon color={props.iconColor} name={props.iconName}/> <strong>{props.label}:</strong> <span
            className="team-stat-value">{props.content}</span>
        </div>
    )
}
