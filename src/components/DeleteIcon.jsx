import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { deleteBooking } from '../services/bookingService';
import { deleteTrip } from '../services/tripService';

export default function DeleteIcon({ id, type }) {
    async function handleClick() {
        let result
        if (type === 'bookings') {
            result = deleteBooking(id)
        } else if (type === 'management') {
            result = deleteTrip(id)
        } else {
            result = false
        }
    }
    
    return (
        <DeleteForeverOutlinedIcon onClick={handleClick} />
    )
}