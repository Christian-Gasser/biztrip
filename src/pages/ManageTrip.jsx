/* https://mui.com/material-ui/react-autocomplete/
https://mui.com/x/react-date-pickers/date-time-range-picker/ */

import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useState, useEffect } from "react"
import { createTrip, getTrip, updateTrip } from "../services/tripService"
import { Button, Select, MenuItem } from "@mui/material"
import InputField from "../components/InputField"
import { getPictures } from "../services/pictureService"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function ManageTrip({ isLoggedIn, isPublisher }) {
        const [isLoading, setIsLoading] = useState(false)
        const [title, setTitle] = useState("")
        const [titleError, setTitleError] = useState(undefined)
        const [description, setDescription] = useState("")
        const [descriptionError, setDescriptionError] = useState(undefined)
        const [img, setImg] = useState(undefined)
        const [imgError, setImgError] = useState(undefined)
        const [startTrip, setStartTrip] = useState(undefined)
        const [startTripError, setStartTripError] = useState(undefined)
        const [endTrip, setEndTrip] = useState(undefined)
        const [endTripError, setEndTripError] = useState(undefined)
        const [pricePerPerson, setPricePerPerson] = useState(undefined)
        const [pricePerPersonError, setPricePerPersonError] = useState(undefined)
        const [meetings, setMeetings] = useState([])
        const [meetingsError, setMeetingsError] = useState(undefined)
        const [valid, setValid] = useState(false)
        const { tripId } = useParams()

        async function handleMount() {
            setIsLoading(true)
            if (tripId !== "new") {
                const trip = getTrip(tripId)
                setTitle(trip.title)
                setDescription(trip.description)
                setImg(trip.img)
                setStartTrip(trip.startTrip)
                setEndTrip(trip.endTrip)
                setPricePerPerson(trip.pricePerPerson)
                setMeetings(trip.meetings)
            }
            setIsLoading(false)
        }
        useEffect(() => {
            handleMount()
        })

        function changeTitle(newVal) {
            setTitle(newVal)
            if (newVal.length < 5) {
                setTitleError(true)
            } else {
                setTitleError(false)
            }
            validity()
        }

        function changeDescription(newVal) {
            setDescription(newVal)
            if (newVal.length < 5) {
                setDescriptionError(true)
            } else {
                setDescriptionError(false)
            }
            validity()
        }

        function changeImg(newVal) {
            setImg(newVal)
            if (!newVal) {
                setImgError(true)
            } else {
                setImgError(false)
            }
            validity()
        }

        function validity() {
            if (titleError === false
                && descriptionError === false
                && imgError === false
                && startTripError === false
                && endTripError === false
                && pricePerPersonError === false
                && meetingsError === false
            ) {
                setValid(true)
                return
            }
            setValid(false)
        }
        function handleSend() {
            if (tripId === "new") {
                createTrip({

                })
            }
        }

        if (!isLoggedIn || !isPublisher) {
            return (
                <div className="content">
                    <h2>You have no rights to manage a trip.</h2>
                    <p>Please log in with your publisher account to manage trips.</p>
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
                <h1>{tripId === "new" ? "Create Trip" : "Update Trip"}</h1>
                <InputField label="Title" type="text" error={titleError} errorText="Title must be in minimum 5 chars long." value={title} onChange={changeTitle} />
                <InputField multiline label="Description" type="multiline" error={descriptionError} errorText="Description must be in minimum 5 chars long" value={description} onChange={changeDescription} />
                <Select label="Img" value={img} variant="standard" onChange={(e) => changeImg(e.target.value)} sx={{ width: '70%' }}>
                    {getPictures().map((picture) => <MenuItem key={picture.id} value={picture.id} >{picture.alt}</MenuItem>)}
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start Date"
                        value={startTrip}
                        onChange={(newValue) => {
                            setStartTrip(newValue)
                            console.log(newValue)
                        }}
                    />
                    <DateTimePicker
                        label="End Date"
                        value={endTrip}
                        onChange={(newValue) => setEndTrip(newValue)}
                    />
                </LocalizationProvider>
                <Button variant="contained" disabled={!valid} onClick={handleSend}>{tripId === "new" ? "Create Trip" : "Update Trip"}</Button>
            </div>
        )
    }