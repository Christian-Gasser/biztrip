import { useState, useEffect } from "react"
import TripItem from "../components/TripItem"
import { getTrips } from "../services/tripService"

export default function Trips() {
  const [trips, setTrips] = useState([])
  /* const [filter, setFilter] = useState("") */

  async function handleMount() {
    const newTrips = await getTrips()
    setTrips(newTrips) 
  }
  
  useEffect(() => {
    handleMount()
  }, [])

  return (
    <div className="flex">
      {/* <section id="filters">
      <InputLabel id="filter-label">Age</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Ten</MenuItem>
          <MenuItem value={1}>Twenty</MenuItem>
          <MenuItem value={2}>Thirty</MenuItem>
          <Me
        </Select>
      </section> */}
      <section id="trips" className="flex">
        {trips.map((trip) => <TripItem key={trip.id} trip={trip}/>)}
        </section>
    </div >
  )
}