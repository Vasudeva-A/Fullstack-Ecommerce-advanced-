import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access"),
  );
  let [user, setUser] = useState(null);

  useEffect(() => {
    let loadUser = async () => {
        try {
        let token = localStorage.getItem("access");
        if (!token) {
          return;
        }
        let res = await fetch(`${BASE_URL}/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();

          setUser(data);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          setUser(null);
          setIsLoggedIn(false);
        }
      }
      catch (err) {
      console.log(err);
    }
    } 
    loadUser()
     
  },[]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
