import { Link as RouterLink } from "react-router-dom";
import EditOutlined from '@mui/icons-material/EditOutlined';

export default function EditIcon({ link }) {
    return (
        <RouterLink to={link} >
            <EditOutlined />
        </RouterLink>
    )
}