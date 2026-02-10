import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../store/Auth";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Welcome to Admin Dashboard</h1>
      <p>Select an option from the sidebar to manage your application.</p>
      <div style={{ marginTop: "30px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <button 
          className="btn" 
          onClick={() => navigate("/admin/users")}
          style={{ padding: "15px 30px", fontSize: "16px" }}
        >
          Manage Users
        </button>
        <button 
          className="btn" 
          onClick={() => navigate("/admin/services")}
          style={{ padding: "15px 30px", fontSize: "16px" }}
        >
          Manage Services
        </button>
        <button 
          className="btn" 
          onClick={() => navigate("/admin/contacts")}
          style={{ padding: "15px 30px", fontSize: "16px" }}
        >
          Manage Contacts
        </button>
      </div>
    </div>
  );
};
