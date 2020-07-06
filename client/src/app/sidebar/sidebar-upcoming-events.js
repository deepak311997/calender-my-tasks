import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';

import { EventServiceContext } from '../event-service/event-service-context';
import EventList from './sidebar-event-list';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        margin: 'auto',
        borderRadius: 20
    },
    input: {
        marginLeft: 10,
        flex: 1,
    },
    iconButton: {
        padding: 2,
    },
    divider: {
        height: 20,
        margin: 4,
    },
    inputBase: {
        fontSize: 14,
        padding: 'unset',
    },
    largeAvatar: {
        height: 60,
        width: 60,
    }
});

function useDebounce(value, delay) {
    const [valueToUpdate, setValue] = useState(value);
  
    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(value);
        }, delay);

        return () => {
          clearTimeout(handler);
        };
    }, [value]);
  
    return valueToUpdate;
}

export default function UpcomingEvents() {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const { events } = useContext(EventServiceContext);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const debouncedSearchText = useDebounce(searchText, 200);

    const onSearch = ({ target }) => {
        setSearchText(target.value);
    };

    const sortAndFilterEvents = () => {
        const filteredEvents = [];

        for (let idx in events) {
            filteredEvents.push({ ...events[idx] });
        }

        setUpcomingEvents(filteredEvents.sort((event1, event2) => new Date(event1.date) - new Date(event2.date))
            .filter(event => event.title.toLowerCase().includes(searchText.toLowerCase())));
    }

    useEffect(() => {
        sortAndFilterEvents();
    }, [events, debouncedSearchText]);

    return (
        <div className='sidebar-content'>
            <Avatar alt="Deepak V" className={classes.largeAvatar}>
                <PersonIcon fontSize='large'/>
            </Avatar>
            <div className='sidebar-content_title'>Upcoming Events</div>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    classes={{ input: classes.inputBase }}
                    placeholder="Search events by title"
                    inputProps={{ 'aria-label': 'search events' }}
                    onChange={onSearch}
                    value={searchText}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <EventList events={upcomingEvents} />
        </div>
    );
}
