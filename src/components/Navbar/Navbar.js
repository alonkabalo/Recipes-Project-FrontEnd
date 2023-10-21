import { Link } from "react-router-dom";
import './Navbar.css'
 export default function Navbar({auth}) {

    return <nav>
        {auth.currentUser ? <>
            <div className="nav-bar-settings">
                <div className="username">{auth.currentUser.name}</div>
                <Link to="/" className="home_btn">Home</Link>
                {(auth.currentUser.type === 'business' || auth.currentUser.admin) && <Link to ="/my-recipes" className="my-cards-btn">My recipes</Link>}
                <Link to="/about" className="about_btn">About</Link>
                <Link to="/favorites" className="about_btn">Favorites</Link>
            </div>
            <div className="logout" onClick={auth.submit_logout}>Log out</div>
        </>  :
         <Link to="/auth" className="link">Login</Link>}
    </nav>
}
