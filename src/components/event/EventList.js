import React, { useEffect, useState } from "react"
import { getEvents, deleteEvent } from "./EventManager.js"
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() =>{
                        history.push({ pathname: "/events/new"})
                    }}
                    >Register New Event</button>}
                {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game.title} session is being hosted by someone.</div>
                        <div className="event__description">{event.description} Description</div>
                        <div className="event__date">Date of event {event.date}</div>
                        <div className="event__time">Time of event {event.time}</div>
                        <button onClick={() => {
                            history.push({ pathname: `/events/${event.id}/update`})
                        }}>
                            Edit Game
                        </button>
                        <button onClick={() => {
                            deleteEvent(event, event.id)
                            .then(response => setEvents(response))
                        }}>
                            Delete Event
                        </button>
                    </section>
                })
            }
        </article>
    )
}