import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { getTrips } from "../services/tripService"
import { getBookingsByUser } from "../services/bookingService"
import DeleteIcon from "../components/DeleteIcon";
import EditIcon from "../components/EditIcon";
import Spinner from "../components/Spinner"

export default function Bookings({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])
  const columns = [
    { field: "tripId", headerName: "Trip" },
    { field: "name", headerName: "Name" },
    { field: "people", headerName: "Nr. People" },
    { field: "startDate", headerName: "Date" },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
            <EditIcon link={"/bookings/" + params.row.id} />
          </div>
        );
      }
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
            <DeleteIcon type={"bookings"} id={params.row.id} />
          </div>
        );
      }
    }
  ]

  async function handleMount() {
    setIsLoading(true)
    const trips = await getTrips()
    const bookings = await getBookingsByUser()
    const userBookings = bookings.map((booking) => {
      const trip = trips.find((bookedTrip) => {
        return bookedTrip.id === booking.tripId
      })
      const startDate = trip.startTrip.map((num) => {
        const newNum = num.toString()
        return newNum.length === 1 ? "0" + newNum : newNum
      })
      return {
        tripId: trip.id,
        name: trip.title,
        people: booking.people,
        startDate: startDate,
        id: booking.id,
      }
    })
    setBookings(userBookings)
    setIsLoading(false)
  }
  useEffect(() => {
    handleMount()
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="content">
        <h2>You are not logged in.</h2>
        <p>Please <Link underline="hover" to="/login" component={RouterLink}>login</Link> to see your booked BizTrips.</p>
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
      <h1>Bookings</h1>
      <DataGrid
        style={{ height: '60vh' }}
        rows={bookings}
        columns={columns}
        disableRowSelectionOnClick
        localeText={{
          noResultsOverlayLabel: 'No bookings found !!!',
        }}
      />
    </div>
  )
}