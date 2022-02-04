import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent } from './EventManager'
import { getGames } from '../game/GameManager'


export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: 1,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then(evt => setGames(evt))
    }, [])

    const changeEventState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentEvent}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game being played: </label>
                    <select name="game" required autoFocus className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>
                        <option value="0"> Select a Game</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                {game.title}
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
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
        
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}