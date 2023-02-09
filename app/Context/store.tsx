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

interface ContextProps {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
  }
  
const GlobalContext = createContext<ContextProps>({
    projects: [],
    setProjects: () => {}
});
  
export const GlobalContextProvider = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
      
    return (
        <GlobalContext.Provider value={{ projects, setProjects }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
