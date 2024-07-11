import { Card, CardMedia, CardContent, Typography, Button, CardActions} from "@mui/material"
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import { getAltbyId } from "../services/pictureService";

export default function TripItem({ trip }) {
  const [startDate, setStartDate] = useState([])
  const [endDate, setEndDate] = useState([])

  useEffect(() => {
    const newStartDate = trip.startTrip.map((num) => {
      const newNum = num.toString()
      return newNum.length === 1 ? "0" + newNum : newNum
    })
    setStartDate(newStartDate)

    const newEndDate = trip.endTrip.map((num) => {
      const newNum = num.toString()
      return newNum.length === 1 ? "0" + newNum : newNum
    })
    setEndDate(newEndDate)
  }, [])

  return (
    <div className="product" key={trip.id}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={getAltbyId(trip.img)}
        height="140"
        image={"/images/items/"+trip.img+".jpg"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {trip.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trip.description}
          <br />
          <br />
          Startdate: {startDate[2]}.{startDate[1]}.{startDate[0]} {startDate[3]}:{startDate[4]}
          <br />
          Enddate: {endDate[2]}.{endDate[1]}.{endDate[0]} {endDate[3]}:{endDate[4]}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={"/trips/"+trip.id}>Book Trip</Button>
      </CardActions>
    </Card>
    </div>
  );
}
