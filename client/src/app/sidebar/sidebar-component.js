import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Drawer, List, ListItem, Fab } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import CloseIcon from '@material-ui/icons/ArrowBack';
import makeStyles from '@material-ui/core/styles/makeStyles';

import UpcomingEvents from './sidebar-upcoming-events';

const useStyles = makeStyles(theme => ({
    drawerOpen: {
        width: 350,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: theme.palette.primary.main,
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        alignItems: 'center',
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
        backgroundColor: theme.palette.primary.main,
      },
      sidebarHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      fabButton: {
        height: 35,
        width: 35,
        minHeight: 35,
        margin: 10,
        color: theme.palette.primary.main,
        backgroundColor: '#FFFFFF',
      },
      upcomingEvents: {
          display: 'none',
      },
}));

export default function SidebarComponent() {
    const classes = useStyles();
    const [isDrawerVisible, setDrawerVisibility] = useState(true);

    const toggleDrawer = () => setDrawerVisibility(state => !state);

    return (
        <>
            <Drawer
                variant='permanent'
                anchor='left'
                onClose={toggleDrawer}
                className={classnames(classes.drawer, {
                    [classes.drawerOpen]: isDrawerVisible,
                    [classes.drawerClose]: !isDrawerVisible,
                })}
                classes={{
                    paper: classnames({
                        [classes.drawerOpen]: isDrawerVisible,
                        [classes.drawerClose]: !isDrawerVisible,
                    }),
                }}
            >
                <div className={classes.sidebarHeader}>
                    <Fab
                        size="small"
                        aria-label="sidebar"
                        onClick={toggleDrawer}
                        className={classnames(classes.fabButton, { [classes.closeButton]: false })}
                    >
                        {isDrawerVisible ? <CloseIcon/> : <EventIcon />}
                    </Fab>
                </div>
                <div className={classnames({ [classes.upcomingEvents]: !isDrawerVisible })}>
                    <UpcomingEvents/>
                </div>
            </Drawer>
        </>
    );
}

SidebarComponent.defaultProps = {

};

SidebarComponent.propTypes = {

}