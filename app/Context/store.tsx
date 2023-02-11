"use client"
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface Project {
  name: string;
  id: number;
  owner: {
    id: number;
  };
  startDate: Date;
  endDate: Date;
  logLine: string;
  dayDetails: {
    startTime: Date;
    endTime: Date;
    location: string;
  }[];
}

interface Role {
  name: String;
  id: Number;
  people: {
    name: String;
    order: Number;
    id: Number;
    email: String;
    phoneNumber: String;
  }[]  
}


interface ContextProps {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
    roles: Role[];
    setRoles: Dispatch<SetStateAction<Role[]>>;
  }
  
const GlobalContext = createContext<ContextProps>({
    projects: [],
    setProjects: () => {},
    roles: [],
    setRoles: () => {}
});
  
export const GlobalContextProvider = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
      
    return (
        <GlobalContext.Provider value={{ projects, setProjects, roles, setRoles }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
