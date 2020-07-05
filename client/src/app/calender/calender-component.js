import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import { Fab, Grid, MenuItem, Select, Tooltip } from '@material-ui/core';
import PreviousIcon from '@material-ui/icons/ChevronLeft';
import NextIcon from '@material-ui/icons/ChevronRight';

import Day from './calender-day-component';
import EventDialog from '../event-dialog/event-dialog-component';
import { EventServiceContext } from '../event-service/event-service-context';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const styles = () => ({
    fabButton: {
        height: 25,
        width: 25,
        minHeight: 25,
        margin: 10,
        color: '#FFFFFF',
        backgroundColor: '#813588',
        border: '2px solid #813588',
        '&:hover': {
            color: '#813588',
            backgroundColor: '#FFFFFF',
        }
    },
    select: {
        minWidth: 110,
        margin: '0 15px',
    },
});

class CalenderComponent extends PureComponent {
    static contextType = EventServiceContext;
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: this.getCurrentMonth(),
            selectedYear: this.getCurrentYear(),
            isEventDialog: false,
            selectedEvent: {},
        }
    }

    getFormattedDate = (year, month, day) => `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;

    getCurrentDate = () => (new Date()).getDate();

    getCurrentMonth = () => (new Date()).getMonth();

    getCurrentYear = () => (new Date()).getFullYear();

    getMonthFirstDay = (month, year) => (new Date(year, month)).getDay();

    getDaysInMonth = (month, year) => 32 - (new Date(year, month, 32)).getDate();

    getDayEvents = date => {
        const events = [];

        for (event in this.context.events) {
            if (date === this.context.events[event].date) {
                events.push(this.context.events[event]);
            }
        }

        return events;
    }

    onEventClick = (event, selectedEvent = {}) => {
        event.stopPropagation();
        this.setState({ selectedEvent, isEventDialog: true });
    }

    renderCalender = () => {
        const { selectedMonth, selectedYear } = this.state;
        const weeksInMonth = [];
        const firstDay = this.getMonthFirstDay(selectedMonth, selectedYear);
        let currentDay = 1;

        for (let row = 0; row < 6; row++) {
            const daysInweek = [];

            for (let col = 0; col < 7; col++) {
                if (row === 0 && col < firstDay) {
                    daysInweek.push(
                        <Grid key={`${row}-${col}`} item={true} className='calender-content-day' />
                    );
                } else if (currentDay > this.getDaysInMonth(selectedMonth, selectedYear)) {
                    break;
                } else {
                    const formattedDate = this.getFormattedDate(selectedYear, selectedMonth + 1, currentDay);

                    daysInweek.push(
                        <Grid
                            key={`${row}-${col}`}
                            item={true}
                            className={classnames('calender-content-day', {
                                'calender-content-today':
                                    currentDay === this.getCurrentDate() && selectedYear === this.getCurrentYear()
                                    && selectedMonth === this.getCurrentMonth()
                            })}
                            onClick={(evt) => this.onEventClick(evt, { date: formattedDate })}
                        >
                            <Day
                                day={currentDay}
                                events={this.getDayEvents(formattedDate)}
                                onClick={this.onEventClick}
                            />
                        </Grid>
                    )
                    currentDay++;
                }
            }

            if (daysInweek.length > 0) {
                weeksInMonth.push(daysInweek);
            }
        }

        return weeksInMonth.map((week, idx) => (
            <Grid
                key={idx}
                container={true}
                style={{ height: `calc((94% - 45px) / ${weeksInMonth.length})` }}
                className='calender-content-week'
            >
                {week}
            </Grid>
        ));
    };

    onPreviousMonth = () => {
        const { selectedMonth, selectedYear } = this.state;
        const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
        const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;

        this.setState(state => ({ selectedMonth: newMonth, selectedYear: newYear }));
    }

    onNextMonth = () => {
        const { selectedMonth, selectedYear } = this.state;
        const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
        const newMonth = (selectedMonth + 1) % 12;

        this.setState(state => ({ selectedMonth: newMonth, selectedYear: newYear }));
    }

    handleMonthChange = ({ target }) => this.setState({ selectedMonth: Number(target.value) });

    handleYearChange = ({ target }) => this.setState({ selectedYear: Number(target.value) });

    toggleEventDialog = () => this.setState(state => ({ isEventDialog: !state.isEventDialog }));

    renderYearList = () => {
        const currentYear = this.getCurrentYear(), yearList = [];

        for (let year = currentYear - 20; year <= currentYear + 20; year++) {
            yearList.push(<MenuItem key={year} value={year}>{year}</MenuItem>);
        }

        return yearList;
    }

    render() {
        const { classes } = this.props;
        const { selectedMonth, isEventDialog, selectedEvent } = this.state;

        return (
            <div className='calender-container'>
                <Grid container={true} alignItems='center' justify='center'>
                    <Tooltip arrow={true} title='Jump to previous month'>
                        <Fab
                            size="small"
                            aria-label="previous"
                            className={classes.fabButton}
                            onClick={this.onPreviousMonth}
                        >
                            <PreviousIcon />
                        </Fab>
                    </Tooltip>
                    <Select
                        label="Month"
                        value={selectedMonth}
                        onChange={this.handleMonthChange}
                        disableUnderline={true}
                        className={classes.select}
                    >
                        {months.map((month, idx) => <MenuItem key={idx} value={idx}>{month}</MenuItem>)}
                    </Select>
                    <Select
                        label="Year"
                        value={this.state.selectedYear}
                        onChange={this.handleYearChange}
                        disableUnderline={true}
                        className={classes.select}
                    >
                        {this.renderYearList()}
                    </Select>
                    <Tooltip arrow={true} title='Jump to next month'>
                        <Fab
                            size="small"
                            aria-label="next"
                            className={classes.fabButton}
                            onClick={this.onNextMonth}
                        >
                            <NextIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid container={true} className='calender-header'>
                    {
                        days.map((day, idx) => (
                            <Grid key={idx} item={true} className='calender-header-day'>
                                {day}
                            </Grid>
                        ))
                    }
                </Grid>
                {this.renderCalender()}
                <EventDialog
                    isOpen={isEventDialog}
                    toggleDialog={this.toggleEventDialog}
                    event={selectedEvent}
                />
            </div>
        );
    }
}

CalenderComponent.defaultProps = {

};

CalenderComponent.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(CalenderComponent);
