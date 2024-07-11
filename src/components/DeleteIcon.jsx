import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { deleteBooking } from '../services/bookingService';
import { deleteTrip } from '../services/tripService';
import { useNavigate } from 'react-router-dom';

export default function DeleteIcon({ id, type }) {
    const navigate = useNavigate()
    async function handleClick() {
        let result
        if (type === 'bookings') {
            result = deleteBooking(id)
        } else if (type === 'management') {
            result = deleteTrip(id)
        } else {
            result = false
        }
        navigate(0)
    }
    
    return (
        <DeleteForeverOutlinedIcon onClick={handleClick} />
    )
}