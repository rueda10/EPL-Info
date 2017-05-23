import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react'

export default (props) => {
  return (
    <List.Item as='div'>
      <Icon name='right triangle' />
      <List.Content>
        <List.Header>{props.label}: {props.content}</List.Header>
      </List.Content>
    </List.Item>
  )
}
