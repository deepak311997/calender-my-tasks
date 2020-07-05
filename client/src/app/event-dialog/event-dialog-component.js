import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { InputAdornment, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AccessTime as DateIcon, Subject as DescIcon }  from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    dialogActionsRoot: {
        padding: 15,
    },
})

const getCurrentDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
}

const getDefaultState = () => ({ title: '', date: getCurrentDate(new Date()), description: '' });

export default function EventDialog({ isOpen, toggleDialog, event: eventDetails }) {
    const classes = useStyles();
    const [eventData, setEventData] = useState(getDefaultState());

    const handleChange = (event) => {
        event.persist();
        setEventData(state => ({ ...state, [event.target.id]: event.target.value }));
    };

    const onEventSave = () => {
        console.log(eventData);
    };

    useEffect(() => {
        if (eventDetails.hasOwnProperty('id')) {
            setEventData(eventDetails);
        }
    }, [eventDetails]);

    useEffect(() => {
        if (!isOpen) {
            setEventData(getDefaultState())
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen} onClose={toggleDialog} fullWidth={true}>
            <DialogTitle id='event-dialog-title'>Add Event</DialogTitle>
            <DialogContent>
                <TextField
                    id='title'
                    label='Add event title'
                    className='event-dialog-content_textfield'
                    value={eventData.title}
                    onChange={handleChange}
                />
                <div className='event-dialog-content_field'>
                    <TextField
                        id='date'
                        type='date'
                        value={eventData.date}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                  <DateIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className='event-dialog-content_field'>
                    <TextField
                        id='description'
                        label='Add description'
                        className='event-dialog-content_textfield'
                        multiline={true}
                        rows={4}
                        rowsMax={6}
                        value={eventData.description}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <DescIcon/>
                              </InputAdornment>
                            ),
                          }}
                    />
                </div>
            </DialogContent>
            <DialogActions classes={{ root: classes.dialogActionsRoot }}>
                <Button color='secondary' size='small' variant='outlined' onClick={toggleDialog}>
                    Close
                </Button>
                <Button color='primary' size='small' variant='outlined' onClick={onEventSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

EventDialog.defaultProps = {
    isOpen: false,
    toggleDialog: () => {},
    event: {},
}

EventDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    event: PropTypes.object,
};