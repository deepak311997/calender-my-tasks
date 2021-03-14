import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '@material-ui/core/';

export default function SidebarEventList({ events = [{ date: '2020-07-06', title: 'Happy Birthday', description: 'Its your birthday so lets go out treat is on me !!' }] }) {
    return (
        <List className='sidebar-content-list'>
            {
                events.map((event) => (
                    <ListItem key={event._id} className='sidebar-content-list_item'>
                        <div className='sidebar-content-list_item--date'>{new Date(event.date).toDateString()}</div>
                        <div className='sidebar-content-list_item--title'>{event.title}</div>
                        <div className='sidebar-content-list_item--desc'>{event.description}</div>
                    </ListItem>
                ))
            }
        </List>
    );
}

SidebarEventList.propTypes = {
    events: PropTypes.array.isRequired,
}