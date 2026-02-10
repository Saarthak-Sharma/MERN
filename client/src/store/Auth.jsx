// import { createContext, useContext, useEffect, useState } from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext();


// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState({});
//   const [services, setServices] = useState();

//   //function to stored the token in local storage
//   const storeTokenInLS = (serverToken) => {
//     setToken(serverToken);
//     return localStorage.setItem("token", serverToken);
//   };

//   //   this is the get the value in either true or false in the original state of token
//   let isLoggedIn = !!token;
//   // console.log("token", token);
//   // console.log("isLoggedin ", isLoggedIn);

//   //   to check whether is loggedIn or not
//   const LogoutUser = () => {
//     setToken("");
//     return localStorage.removeItem("token");
//   };

//   //jwt Authentication : to get currently loggedin user data

//  const userAuthentication = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/user", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.user);
//         //console.log(data.user);
//       } else {
//         console.error("Error fetching user data");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
 
//   const getServices = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/data/service", {
//         method: "GET",
//       });

//       const data = await response.json();
//       //console.log("API RES DATA:", data);

//       if(data && Array.isArray(data.data)) {
//         // const data = await response.json();
//         // console.log("API RES DATA:", data);
//         // console.log("API RES DATA.DATA:", data.data);
//         setServices(data.data);
//       }
//       else {
//         setServices([]);
//       }
//     } catch (error) {
//       console.log(`services frontend error: ${error}`);
      
//     }
//   }
  
//   if(userAuthentication == 1) {
//     console.log(userAuthentication);
//   }
  

//   useEffect(() => {
//     getServices();
//     if(token) { userAuthentication(); }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, storeTokenInLS, LogoutUser, services }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the Provider");
//   }
//   return authContextValue;
// };


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
