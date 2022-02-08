import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGames } from "../game/GameManager"
import { getEventById, updateEvent } from "./EventManager"

export const UpdateEventForm = () => {
    const [games, setGames] = useState([])
    const {eventId} = useParams()
    const history = useHistory()
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    useEffect(() => {
        getEventById(eventId).then(eventData => setCurrentEvent({
            game: eventData.game.id,
            description: eventData.description,
            date: eventData.date,
            time: eventData.time}))
            .then(getGames().then(data => setGames(data)))
    }, [eventId])

    const changeUpdatedEvent = (domEvent) => {
        domEvent.preventDefault()
        const copy = { ...currentEvent }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="updateForm">
            <h2 className="updateForm__title">Edit the event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event">Game: </label>
                    <select name="game" required autoFocus className="form-control"
                        value={currentEvent.game}
                        onChange={changeUpdatedEvent}>
                        <option value="0"> Select a Game</option>
                        {
                            games.map(gameData => (
                                <option key={gameData.title} value={gameData.id}>
                                    {gameData.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeUpdatedEvent}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event: </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeUpdatedEvent}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeUpdatedEvent}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                    }

                    // Send POST request to your API
                    updateEvent(event, eventId)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )


}