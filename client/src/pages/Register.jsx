import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify';

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Auth status check

  // Prevent logged-in user from accessing Register page
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // dont save Token for restrict auto login 
        toast.success("Registration Successful! Please login to access services.");
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login"); 
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Register Error", error);
    }
  };

  return (
    <section className="section-registration">
      <div className="container grid grid-two-cols">
        <div className="registration-image">
          <img src="/images/register.png" alt="register" width="400" height="500" />
        </div>
        <div className="registration-form">
          <h1 className="main-heading mb-3">Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" value={user.username} onChange={handleInput} placeholder="username" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={user.email} onChange={handleInput} placeholder="email" required />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" value={user.phone} onChange={handleInput} placeholder="phone" required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={user.password} onChange={handleInput} placeholder="password" required />
            </div>
            <br />
            <button type="submit" className="btn btn-submit">Register Now</button>
          </form>
        </div>
      </div>
    </section>
  );
};