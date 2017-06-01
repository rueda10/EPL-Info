import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react'

export default (props) => {
  return (
    <List.Item as='div'>
      <Icon name='right triangle' />
      <List.Content>
        <List.Description><strong>{props.label}:</strong> {props.content}</List.Description>
      </List.Content>
    </List.Item>
  )
}
