import { useState, useEffect } from "react"
import { getTrip } from "../services/tripService"
import { useParams, Link as RouterLink } from "react-router-dom"
import Spinner from "../components/Spinner"
import { Card, Link, CardMedia, CardContent, Typography } from "@mui/material"
import { getAltbyId } from "../services/pictureService"

export default function Trip({ isLoggedIn }) {
  const [startDate, setStartDate] = useState([])
  const [endDate, setEndDate] = useState([])
  const [trip, setTrip] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [people, setPeople] = useState(undefined)
  const [] = useState([])
  const { tripId } = useParams()

  async function handleMount() {
    if (!isLoggedIn) {
      return
    }
    setIsLoading(true)
    const selectedTrip = getTrip(parseInt(tripId))
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
    setIsLoading(false)
  }
  useEffect(() => {
    handleMount()
  }, [])

  if (!isLoggedIn) {
    return (
      <div>
        <h2>You are not logged in.</h2>
        <p>Please <Link underline="hover" to="/login" component={RouterLink}>login</Link> to see this page and book your BizTrip.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="content booking">
      <h2>{trip.title}</h2>
      <div>
        <Card sx={{ maxWidth: 345, height: '70vh' }}>
          <CardMedia
            component="img"
            alt={getAltbyId(trip.img)}
            height="140"
            image={"images/items/" + trip.img + ".jpg"}
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
      <div>

      </div>
    </div>
  )

}