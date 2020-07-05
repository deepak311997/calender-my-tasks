import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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
});

export default function UpcomingEvents() {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');

    const onSearch = ({ target }) => {
        setSearchText(target.value);
    };

    return (
        <div className='sidebar-content'>
            <div className='sidebar-content_title'>Upcoming Events</div>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    classes={{ input: classes.inputBase }}
                    placeholder="Search Events"
                    inputProps={{ 'aria-label': 'search events' }}
                    onChange={onSearch}
                    value={searchText}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
}
