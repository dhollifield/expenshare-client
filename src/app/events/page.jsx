'use client'

import Link from "next/link"
import { useEffect, useState } from 'react';
import { getEvents } from "../lib/actions";

export default function Events() {
const [events, setEvents] = useState([]);

useEffect(() => {
    async function fetchEvents() {
        try {
            const events = await getEvents();
            setEvents(events);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    }

    fetchEvents();
}, []);

return <>
    <p class="text-blue-600">Events List</p>
    <div>
    <ul class="flex justify-center">
        {events.map((event) => (
            <li class="list-none shadow rounded-lg p-3" key={event.id} id={event.id}>
                <p class="text-red-400">{event.name}</p>
                <p>{event.date}</p>
                <p>{event.comment}</p>
            </li>
        ))}
    </ul>
    </div>
    </>
}