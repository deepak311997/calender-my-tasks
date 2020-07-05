import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Day({ day, events, onClick }) {
    return (
        <>
            <div>{day}</div>
            <div className='calender-content-day_events'>
                {
                    events.map(event => (
                        <div
                            key={event._id}
                            id={event._id}
                            className='calender-content-day_events--event'
                            onClick={evt => onClick(evt, event)}
                        >
                            {event.title}
                        </div>
                    ))
                }
            </div>
        </>
    );
}

Day.defaultProps = {
    day: 1,
    events: [],
};

Day.propTypes = {
    day: PropTypes.number,
    events: PropTypes.array,
};