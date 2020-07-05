import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { InputAdornment, Button, Fab, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AccessTime as DateIcon, Subject as DescIcon, Delete as DeleteIcon }  from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { EventServiceContext } from '../event-service/event-service-context';

const useStyles = makeStyles({
    dialogActionsRoot: {
        padding: 15,
    },
    fabButton: {
        height: 35,
        width: 35,
        minHeight: 25,
        margin: 10,
        color: '#FFFFFF',
        backgroundColor: '#813588',
        border: '2px solid #813588',
        float: 'right',
        '&:hover': {
            backgroundColor: '#813588',
        }
    },
})

const getFormattedDate = (date = new Date()) => {
    const year = date.getFullYear(), month = date.getMonth(), day = date.getDate();

    return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
}

const getDefaultState = () => ({ title: '', date: '', description: '' });

export default function EventDialog({ isOpen, toggleDialog, event: eventDetails }) {
    const classes = useStyles();
    const [eventData, setEventData] = useState(getDefaultState());
    const { addEvent, updateEvent, deleteEvent } = useContext(EventServiceContext);
    const isUpdate = eventDetails.hasOwnProperty('_id');

    const handleChange = (event) => {
        event.persist();
        setEventData(state => ({ ...state, [event.target.id]: event.target.value }));
    };

    const onEventSave = () => {
        if (isUpdate) {
            updateEvent(eventData);
        } else {
            addEvent(eventData);
        }
        toggleDialog();
    };

    const onEventDelete = () => {
        deleteEvent(eventData._id);
        toggleDialog();
    }

    useEffect(() => {
        if (isUpdate) {
            setEventData(eventDetails);
        }
    }, [eventDetails]);

    useEffect(() => {
        if (!isOpen) {
            setEventData(getDefaultState())
        } else {
            if (isUpdate) {
                setEventData(eventDetails);
            } else {
                setEventData(state => ({ ...state, date: eventDetails.date ? eventDetails.date : getFormattedDate() }));
            }
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen} onClose={toggleDialog} fullWidth={true}>
            <DialogTitle id='event-dialog-title'>
                {`${isUpdate ? 'Update' : 'Add'} Event`}
                { isUpdate &&
                    <Fab
                        aria-label="delete"
                        className={classes.fabButton}
                        onClick={onEventDelete}
                    >
                        <DeleteIcon fontSize='small'/>
                    </Fab>
                }
            </DialogTitle>
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