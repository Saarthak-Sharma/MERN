import { createContext, useContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [services, setServices] = useState();

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  // console.log("token", token);
  // console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //jwt Authentication : to get currently loggedin user data

 const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        //console.log(data.user);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      const data = await response.json();
      //console.log("API RES DATA:", data);

      if(data && Array.isArray(data.data)) {
        // const data = await response.json();
        // console.log("API RES DATA:", data);
        // console.log("API RES DATA.DATA:", data.data);
        setServices(data.data);
      }
      else {
        setServices([]);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
      
    }
  }
  
  if(userAuthentication == 1) {
    console.log(userAuthentication);
  }
  

  useEffect(() => {
    getServices();
    if(token) { userAuthentication(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, storeTokenInLS, LogoutUser, services }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
