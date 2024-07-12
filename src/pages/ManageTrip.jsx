/* https://mui.com/material-ui/react-autocomplete/
https://mui.com/x/react-date-pickers/date-time-range-picker/ */

import { useNavigate, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useState, useEffect } from "react"
import { createTrip, getTrip, updateTrip } from "../services/tripService"
import { Button, Select, MenuItem, Card, CardActions, CardContent, Typography, fabClasses } from "@mui/material"
import InputField from "../components/InputField"
import { getPictures } from "../services/pictureService"
import TimeInput from "../components/TimeInput"

export default function ManageTrip({ isLoggedIn, isPublisher }) {
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(undefined)
    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState(undefined)
    const [img, setImg] = useState(1)
    const [imgError, setImgError] = useState(undefined)
    const [startTrip, setStartTrip] = useState([0, 0, 0, 0, 0])
    const [startTripError, setStartTripError] = useState(undefined)
    const [endTrip, setEndTrip] = useState([0, 0, 0, 0, 0])
    const [endTripError, setEndTripError] = useState(undefined)
    const [pricePerPerson, setPricePerPerson] = useState(undefined)
    const [pricePerPersonError, setPricePerPersonError] = useState(undefined)
    const [meetings, setMeetings] = useState([])
    const [valid, setValid] = useState(false)
    const { tripId } = useParams()
    const navigate = useNavigate()

    async function handleMount() {
        setIsLoading(true)
        if (tripId !== "new") {
            const trip = await getTrip(tripId)
            setTitle(trip.title)
            setTitleError(false)
            setDescription(trip.description)
            setDescriptionError(false)
            setImg(trip.img)
            setImgError(false)
            setStartTrip(trip.startTrip)
            setStartTripError(false)
            setEndTrip(trip.endTrip)
            setEndTripError(false)
            setPricePerPerson(trip.pricePerPerson)
            setPricePerPersonError(false)
            setMeetings([...trip.meetings])
            setValid(true)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleMount()
    }, [])

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
    function changeStartTrip(newVal, valid) {
        setStartTrip(newVal)
        setStartTripError(!valid)
        validity()
    }
    function changeEndTrip(newVal, valid) {
        setEndTrip(newVal)
        setEndTripError(!valid)
        validity()
    }
    function changePricePerPerson(newVal) {
        setPricePerPerson(newVal)
        if (newVal < 0) {
            setPricePerPersonError(true)
        } else {
            setPricePerPersonError(false)
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
            && meetings.length > 0
        ) {
            setValid(true)
            return
        }
        console.log('valid')
        console.log('title: ' + titleError)
        console.log('description: ' + descriptionError)
        console.log('img: ' + imgError)
        console.log('startTrip: ' + startTripError)
        console.log('endTrip: ' + endTripError)
        console.log('pricePerPerson: ' + pricePerPersonError)
        console.log('meetings: ' + meetings.length)
        console.log('invalid')
        setValid(false)
    }
    async function handleSend() {
        if (tripId === "new") {
            await createTrip({
                title: title, 
                description: description, 
                img: img, 
                startTrip: startTrip, 
                endTrip: endTrip, 
                pricePerPerson: pricePerPerson, 
                meetings: meetings
            })
        } else {
            await updateTrip({
                id: tripId,
                title: title, 
                description: description, 
                img: img, 
                startTrip: startTrip, 
                endTrip: endTrip, 
                pricePerPerson: pricePerPerson, 
                meetings: meetings
            })
        }
        navigate("/management")
    }
    function addNewMeeting() {
        console.log(meetings)
        let biggestId = 0
        meetings.forEach((meeting) => {
            if (meeting.id > biggestId) {
                biggestId = meeting.id
            }
        })
        const id = biggestId + 1
        const newMeeting = {
            id: id,
            title: "",
            description: "",
            date: [0, 0, 0, 0, 0]
        }
        setMeetings([
            ...meetings,
            newMeeting
        ])
    }
    function deleteMeeting(id) {
        setMeetings([
            ...meetings.filter((meeting) => meeting.id !== id)
        ])
    }

    if (!isLoggedIn || !isPublisher) {
        return (
            <div className="content">
                <h2>You have no rights to manage a trip.</h2>
                <p>Please log in with your publisher account to manage trips.</p>
            </div>
        )
    }
    function changeMeeting(newVal, id, field) {
        const index = meetings.findIndex((meeting) => meeting.id === id)
        const meetingToChange = meetings.find((meeting) => meeting.id === id)
        let changedMeeting
        if (field === 'description') {
            changedMeeting = {
                id: meetingToChange.id,
                title: meetingToChange.title,
                description: newVal,
                date: meetingToChange.date
            }
        } else if (field === 'title') {
            changedMeeting = {
                id: meetingToChange.id,
                title: newVal,
                description: meetingToChange.description,
                date: meetingToChange.date
            }
        } else {
            changedMeeting = {
                id: meetingToChange.id,
                title: meetingToChange.title,
                description: meetingToChange.description,
                date: newVal
            }
        }
        setMeetings([
            ...meetings.map((meeting) => {
                if (meeting.id === id) {
                    return changedMeeting
                }
                return meeting
            })
        ])
        console.log(meetings)
        validity()
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
            <TimeInput label="Start date" value={startTrip} onChange={changeStartTrip} />
            <TimeInput label="End date" value={endTrip} onChange={changeEndTrip} />
            <InputField label="Price per person" type="number" error={pricePerPersonError} errorText="Price must be in minimum CHF 0.-" value={pricePerPerson} onChange={changePricePerPerson} />
            <br />
            <div>
                <p>Meetings:</p>
                <Button onClick={() => addNewMeeting()}>Create new Meeting</Button>
                {meetings.map((meeting) =>
                    <Card sx={{ width: '70%' }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                <InputField label="Title" type="text" value={meeting.title} onChange={(newVal) => changeMeeting(newVal, meeting.id, 'title')} />
                                <InputField multiline label="Description" type="multiline" value={meeting.description} onChange={(newVal) => changeMeeting(newVal, meeting.id, 'description')} />
                                <TimeInput label="Date" value={meeting.date} onChange={(newVal) => changeMeeting(newVal, meeting.id, 'meeting')} />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => deleteMeeting(meeting.id)}>Delete Meeting</Button>
                        </CardActions>
                    </Card>
                )}
            </div>
            <Button variant="contained" disabled={!valid} onClick={handleSend}>{tripId === "new" ? "Create Trip" : "Update Trip"}</Button>
        </div>
    )
}