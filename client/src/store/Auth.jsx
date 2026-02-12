import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [services, setServices] = useState([]); //default array

  // function to store token in localStorage
  const storeTokenInLS = useCallback((serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  }, []);

  const isLoggedIn = !!token;

  const LogoutUser = useCallback(() => {
    setToken("");
    localStorage.removeItem("token");
  }, []);

  const userAuthentication = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.log("User Auth Error:", error);
    }
  }, [token]);

  const getServices = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.data);
      }
    } catch (error) {
      console.log("Services Frontend Error:", error);
      // Fallback data when backend is not running
      setServices([
        {
          service: "HTML",
          description: "Learn HTML fundamentals and structure",
          provider: "TechEd",
          price: "₹999",
          isFree: true
        },
        {
          service: "CSS",
          description: "Master CSS styling and layouts",
          provider: "TechEd",
          price: "₹1299",
          isFree: false
        },
        {
          service: "JavaScript",
          description: "Learn JavaScript programming",
          provider: "TechEd",
          price: "₹1599",
          isFree: false
        }
      ]);
    }
  }, []);

  useEffect(() => {
    getServices(); // Always fetch services
    if (token) {
      userAuthentication();
    }
  }, [token, userAuthentication, getServices]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        services,
        authorizationToken: `Bearer ${token}`,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
