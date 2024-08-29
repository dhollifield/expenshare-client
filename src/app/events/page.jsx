'use client'

import Link from "next/link"
import { format } from "date-fns";
import { useEffect, useState } from 'react';
import { getEventsWithUsers } from "../lib/actions";

export default function Events() {
const [events, setEvents] = useState([]);

useEffect(() => {
    async function fetchEvents() {
        try {
            const events = await getEventsWithUsers();
            setEvents(events);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    }

    fetchEvents();
}, []);

return <>
    <p className="text-blue-600">Events List</p>
    <div>
    <ul className="flex justify-center">
        {events.map((event) => (
            <li className="list-none shadow rounded-lg p-3" key={event.eventId} id={event.eventId}>
                <p className="font-bold text-2xl text-red-400">{event.eventName}</p>
                <p className="text-sm justify-center text-blue-600">{event.eventComment}</p>
                <p>--{format(new Date(event.eventDate), 'MMMM dd, yyyy')}--</p>
                <ul className="list-none shadow rounded-lg p-3">
                    <h6 className="font-bold">Participants:</h6>
                {event.users.map((user) => (
                    <li key={user.id} id={user.id}>
                        <p>{user.name}</p>
                    </li>
                ))}
                </ul>
            </li>
        ))}
    </ul>
    </div>
    </>
}