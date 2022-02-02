import React, { useEffect } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game} session is being hosted by {event.organizer}</div>
                        <div className="event__description">{event.description} Description</div>
                        <div className="event__date">Date of event {event.date}</div>
                        <div className="event__time">Time of event {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}