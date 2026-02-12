import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/Auth";

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <header>
      <div className="container">
        <div className="logoBrand">
          <NavLink to="/">TechGrow Academy</NavLink>
        </div>
        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/service">Service</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            {isLoggedIn && user?.isAdmin && <li><NavLink to="/admin/users">Admin</NavLink></li>}
            
            {/* Logic: if Login else Login & Register */}
            {isLoggedIn ? (
              <li><NavLink to="/logout">Logout</NavLink></li>
            ) : (
              <>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};