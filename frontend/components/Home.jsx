import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import $ from 'jquery';
import GroupItem from './groups/GroupItem';

@Radium
class Home extends React.Component {
    componentDidMount() {
        $.get('/groups', {}, (groups) => { this.setState({ groups }); });
    }
    get styles() {
        return {
            list: {
                padding: 0,
            },
        };
    }
    get groups() {
        if (!_.isUndefined(this.state.groups)) {
            return this.state.groups;
        }
        return [];
    }
    render() {
        return (
          <div>
            <h3>My Groups</h3>
            <ul style={this.styles.list}>
              {_.map(this.groups, group => <GroupItem key={group.id} {...group} />)}
            </ul>
          </div>
        );
    }
}


export default Home;
