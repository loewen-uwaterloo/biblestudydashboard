import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import $ from 'jquery';
import _ from 'lodash';
import UserRow from '../users/UserRow';
import SharedRow from '../shared/SharedRow';
import AddCommentForm from '../comments/AddCommentForm';
import CommentRow from '../comments/CommentRow';
import GroupActions from '../../actions/GroupActions'

@Radium
class GroupDashboard extends React.Component {
    get styles() {
        return {
            base: {
                display: 'flex',
            },
            users: {
                margin: 0,
                padding: '5px',
                borderTop: '1px solid #a1a6b4',
                color: '#0d0221',
            },
            shared: {
                margin: 0,
                padding: '5px',
            },
            column1: {
                flexGrow: 0,
            },
            column2: {
                flexGrow: 1,
            },
            header: {
                color: '#0d0221',
            },
            name: {
                textTransform: 'capitalize',
            }
        };
    }
    addRow(comment) {
    }
    render() {
        // TODO support editing #28
        const editState = _.pick(this.state, ['name', 'description', 'id']);
        return (
          <div>
            <div style={this.styles.header}>
              <h2 style={this.styles.name}>{this.props.group.name} Dashboard</h2>
              <h4>{this.props.group.description}</h4>
            </div>
            <div style={this.styles.base}>
              <div style={this.styles.column1}>
                <h5>Users</h5>
                <ul style={this.styles.users}>
                  {_.map(this.props.users, user => <UserRow key={user.id} {...user} />)}
                </ul>
              </div>
              <div style={this.styles.column2}>
                <h5>Shared Content</h5>
                <ul style={this.styles.shared}>
                  {_.map(this.props.group.docs, shared => (
                    <SharedRow
                      key={'doc-'+ shared.id}
                      groupId={this.props.group.id}
                      type="document"
                      {...shared}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <h5>Comments</h5>
            <ul>
              {_.map(
                  this.props.group.comments,
                  comment => <CommentRow key={comment.id} {...comment} />)
              }
            </ul>
            <AddCommentForm
              type="Group"
              parentId={this.props.group.id}
              updateAfterAdd={this.addRow}
            />
          </div>
        );
    }
}

export default GroupDashboard;
