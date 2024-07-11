import { Link as RouterLink } from "react-router-dom"
import { Button, Link } from "@mui/material"

export default function Header({ isLoggedIn, onLogout, isPublisher, onRequestPublisher }) {

  return (
    <header>
      <RouterLink to="/">
        <img width="150px" alt="Business Trips" src="/images/logo.png" />
      </RouterLink>
      <div className="nav">
        <div className="nav-item">
          <Link underline="none" to="/trips" component={RouterLink}>Trips</Link>
        </div>
        {(isLoggedIn) ?
          <div className="nav-item">
            <Link underline="none" to="/bookings" component={RouterLink}>Bookings</Link>
          </div>
          : null
        }
        {(isLoggedIn && isPublisher) ?
          <div className="nav-item">
            <Link underline="none" to="/management" component={RouterLink}>Management</Link>
          </div>
          : null
        }
        {(isLoggedIn && !isPublisher) ?
          <div className="nav-item">
            <Button variant="outlined" onClick={onRequestPublisher}>Request Publisher</Button>
          </div>
          : null
        }
        {(isLoggedIn) ?
          <div className="nav-item">
            <Button variant="contained" onClick={onLogout}>Logout</Button>
          </div>
          :
          <div className="nav-item">
            <Button variant="contained" component={RouterLink} to="/login">Login</Button>
          </div>
        }
      </div>
    </header>
  );
}
