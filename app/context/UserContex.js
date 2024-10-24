"use client";
import { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will hold the user data
  const [isAdmin, setIsAdmin] = useState(false); // This holds the admin flag

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
