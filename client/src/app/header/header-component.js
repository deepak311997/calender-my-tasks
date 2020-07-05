import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';

import EventDialog from '../event-dialog/event-dialog-component';

const useStyles = makeStyles(theme => ({
    fabButton: {
        height: 35,
        width: 35,
        minHeight: 35,
        margin: 10,
        color: '#FFFFFF',
        backgroundColor: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: '#FFFFFF',
        }
    },
}));

export default function FilterComponent() {
    const [isAddEventDialog, setAddEventDialog] = useState(false);
    const classes = useStyles();

    const toggleEventDialog = () => setAddEventDialog(state => !state);
    
    return (
        <div className='header-container'>
            <div className='header-title'>
                Event Calender
            </div>
            <div className='header-actions'>
                <Tooltip arrow={true} title='Add a task'>
                    <Fab
                        size='small'
                        aria-label='previous'
                        className={classes.fabButton}
                        onClick={toggleEventDialog}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
            <EventDialog
                isOpen={isAddEventDialog}
                toggleDialog={toggleEventDialog}
            />
        </div>
    );
}

FilterComponent.defaultProps = {

};

FilterComponent.propTypes = {

}