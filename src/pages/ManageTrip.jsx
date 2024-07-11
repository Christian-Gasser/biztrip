/* https://mui.com/material-ui/react-autocomplete/
https://mui.com/x/react-date-pickers/date-time-range-picker/ */

import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useState, useEffect } from "react"

export default function ManageTrip({ isLoggedIn, isPublisher }) {
    const [isLoading, setIsLoading] = useState(false)
    const { tripId } = useParams()

    async function handleMount() {

    }
    useEffect(() => {
        handleMount()
    })

    function handleSend() {

    }

    if (!isLoggedIn || !isPublisher) {
        return (
            <div className="content">
                <h2>You have no rights to manage a trip.</h2>
                <p>Please logIn with your publisher account to manage trips.</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="content">
            <h1>{tripId === "new" ? "Create Trip" : "Manage Trip"}</h1>

        </div>
    )
}