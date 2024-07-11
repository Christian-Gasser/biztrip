import { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import Spinner from "../components/Spinner"
import EditIcon from "../components/EditIcon"
import DeleteIcon from "../components/DeleteIcon"
import { Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { getTripByPublisher } from "../services/tripService"
import { getAltbyId } from "../services/pictureService"

export default function Management({ isPublisher }) {
  const [isLoading, setIsLoading] = useState(false)
  const [trips, setTrips] = useState([])

  async function handleMount() {
    const usersTrips = await getTripByPublisher()
    const tripList = usersTrips.map((trip) => {
      console.log(typeof trip.img)
      return {
        id: trip.id,
        title: trip.title,
        city: getAltbyId(trip.img),
        startDate: trip.startTrip.map((num) => {
          const newNum = num.toString()
          return newNum.length === 1 ? "0" + newNum : newNum
        })
      }
    })

    setTrips(tripList)
  }

  useEffect(() => {
    handleMount()
  }, [])
  const columns = [
    { field: "id", headerName: 'Id' },
    { field: "title", headerName: 'Name' },
    { field: "city", headerName: 'City' },
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
            <EditIcon link={"/management/" + params.row.id} />
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
            <DeleteIcon type={"management"} id={params.row.id} />
          </div>
        );
      }
    }
  ]


  if (!isPublisher) {
    return (
      <div className="content">
        <h2>You are not a publisher.</h2>
        <p>Please request publisher role to see create and manage your BizTrips.</p>
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
      <h1>Management</h1>
      <RouterLink to="/management/new">
        <Button>Create new trip</Button>
      </RouterLink>
      <DataGrid
        style={{ height: '60vh' }}
        rows={trips}
        columns={columns}
        disableRowSelectionOnClick
        localeText={{
          noResultsOverlayLabel: 'No trips found !!!',
        }}
      />
    </div>
  )
}
