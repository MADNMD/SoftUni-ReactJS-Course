import { useEffect, useState } from "react";

import * as eventService from '../../services/eventService';
import { DashboardItem } from "./DashboardItem/DashboardItem";

export const Dashboard = () => {

    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        eventService.getAllEvents()
            .then(events => {
                setAllEvents(events)
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    return (
        <>
            <h2>Current Events</h2>
            {allEvents.length === 0
                ? <h4>No Events yet.</h4>
                : <section id="dashboard">
                    {allEvents.map(event => <DashboardItem key={event._id} event={event} />)}
                </section>
            }
        </>
    )
}