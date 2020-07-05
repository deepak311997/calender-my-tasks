import React, { memo, useState, useEffect, createContext } from 'react';
import * as resource from './event-service-resource';

export const EventServiceContext = createContext({
    events: {},
    addEvent: () => {},
    updateEvent: () => {},
    deleteEvent: () => {},
    setEvents: () => {},
});

function EventServiceProviderComponent({ children }){
    const [events, setEvents] = useState({});

    const addEvent = (event) => {
        resource.addEvent(event).then(({ data }) => {
            // Add the new event
            setEvents(oldEvents => ({ ...oldEvents, [data._id]: data }));
        })
    }

    const updateEvent = (event) => {
        resource.updateEvent(event).then(({ data }) => {
            // Update the event
            setEvents(oldEvents => ({ ...oldEvents, [data._id]: data }));
        })
    }

    const deleteEvent = (id) => {
        resource.deleteEvent(id).then(({ data }) => {
            const newEventList = { ...events };

            // Delete the event
            delete newEventList[data._id];
            setEvents(newEventList);
        })
    }

    useEffect(() => {
        resource.getEvents().then(({ data }) => {
            const newEventList = data.reduce((acc, cur) => {
                acc[cur._id] = cur;
                return acc;
            }, {});

            setEvents(newEventList);
        })
    }, []);

    return (
        <EventServiceContext.Provider value={{ events, setEvents, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventServiceContext.Provider>
    );
}

export default memo(EventServiceProviderComponent);