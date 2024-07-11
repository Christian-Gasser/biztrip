import { useState, useEffect } from "react"
import { getTrip } from "../services/tripService"
import { useParams, Link as RouterLink , useNavigate} from "react-router-dom"
import Spinner from "../components/Spinner"
import { Card, Link, CardMedia, CardContent, Typography, Button } from "@mui/material"
import { getAltbyId } from "../services/pictureService"
import InputField from "../components/InputField"
import { DataGrid } from "@mui/x-data-grid"
import { createBooking } from "../services/bookingService"

export default function Trip({ isLoggedIn }) {
  const [startDate, setStartDate] = useState([])
  const [endDate, setEndDate] = useState([])
  const [trip, setTrip] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [people, setPeople] = useState(undefined)
  const [peopleError, setPeopleError] = useState(false)
  const [meetings, setMeetings] = useState([])
  const [selectedMeetings, setSelectedMeetings] = useState([])
  const [meetingsError, setMeetingsError] = useState(false)
  const [valid, setValid] = useState(false)
  const navigate = useNavigate()
  const { tripId } = useParams()
  const columns = [
    { field: "id", headerName: "Nr." },
    { field: "title", headerName: "Name" },
    { field: "description", headerName: "Description" },
    { field: "date", headerName: "Date" }
  ]


  async function handleMount() {
    if (!isLoggedIn) {
      return
    }
    setIsLoading(true)
    console.log(tripId + "|ok")
    const selectedTrip = await getTrip(tripId)
    setTrip(selectedTrip)
    const newStartDate = selectedTrip.startTrip.map((num) => {
      const newNum = num.toString()
      return newNum.length === 1 ? "0" + newNum : newNum
    })
    setStartDate(newStartDate)

    const newEndDate = selectedTrip.endTrip.map((num) => {
      const newNum = num.toString()
      return newNum.length === 1 ? "0" + newNum : newNum
    })
    setEndDate(newEndDate)
    const meetings = selectedTrip.meetings.map((meeting) => {
      const meetingDate = meeting.date.map((num) => {
        const newNum = num.toString()
        return newNum.length === 1 ? "0" + newNum : newNum
      })
      return {
        id: meeting.id,
        title: meeting.title,
        description: meeting.description,
        date: meetingDate
      }
    })
    setMeetings(meetings)
    setIsLoading(false)
  }
  useEffect(() => {
    console.log('useEffect')
    handleMount()
  }, [])

  function changePeople(newVal) {
    setPeople(newVal)
    if (newVal < 1) {
      setPeopleError(true)
      return
    }
    setPeopleError(false)
    validity()
  }

  function changeMeetings(newVal) {
    setSelectedMeetings(newVal)
    if (newVal.length === 0) {
      setMeetingsError(true)
      return
    }
    setMeetingsError(false)
    validity()
  }

  function validity() {
    if (meetingsError === false && peopleError === false) {
      setValid(true)
      return
    }
    setValid(false)
  }

  async function handleBooking() {
    const result = await createBooking({
      tripId: trip.id,
      people: parseInt(people),
      meetings: selectedMeetings
    })
    if (result) {
      navigate("/bookings")
    }
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h2>You are not logged in.</h2>
        <p>Please <Link underline="hover" to="/login" component={RouterLink}>login</Link> to see this page and book your BizTrip.</p>
      </div>
    )
  }

  if (isLoading || !trip) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="content">
      <h1>{trip.title}</h1>
      <div className="booking">
        <div className="booking-card">
          <Card sx={{ maxWidth: 345, height: '70vh' }}>
            <CardMedia
              component="img"
              alt={getAltbyId(trip.img)}
              height="140"
              image={"/images/items/" + trip.img + ".jpg"}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {trip.description}
                <br />
                <br />
                Startdate: {startDate[2]}.{startDate[1]}.{startDate[0]} {startDate[3]}:{startDate[4]}
                <br />
                Enddate: {endDate[2]}.{endDate[1]}.{endDate[0]} {endDate[3]}:{endDate[4]}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="booking-selectors content">
          <InputField label="Nr. of people" type="number" error={peopleError} errorText="Please select a number of persons" value={people} onChange={changePeople} />
          <DataGrid 
            style={{ height: '60vh' }}
            columns={columns}
            rows={trip.meetings}
            selectionModel={selectedMeetings}
            checkboxSelection
            hideFooterSelectedRowCount
            onRowSelectionModelChange={(selection) => changeMeetings(selection)}
            disableColumnFilter
            disableColumnSorting
            disableColumnMenu={true}
          />
          <p>Price Total:</p>
          <p>{people}x CHF {trip.pricePerPerson}</p>
          <hr/>
          <p>CHF: {trip.pricePerPerson*people}</p>
          <Button variant="contained" disabled={!valid} onClick={handleBooking}>Book BizTrip</Button>
        </div>
      </div>
    </div>
  )

}