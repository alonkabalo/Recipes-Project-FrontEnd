import { Link } from "react-router-dom";
import './Navbar.css'
 export default function Navbar({auth}) {

    return <nav>
        {auth.currentUser ? <>
            <div className="nav-bar-settings">
                <div className="username">{auth.currentUser.name}</div>
            </div>
            <div className="logout" onClick={auth.submit_logout}>Log out</div>
        </>  :
         <Link to="/auth" className="link">Login</Link>}
    </nav>
}
