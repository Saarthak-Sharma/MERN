import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <h2>Admin Panel</h2>
        <ul>
          <li><NavLink to="/admin/users">Users</NavLink></li>
          <li><NavLink to="/admin/services">Services</NavLink></li>
          <li><NavLink to="/admin/contacts">Contacts</NavLink></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};
