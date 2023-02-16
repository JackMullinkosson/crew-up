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

interface GoTo {
  name: String;
  id: Number;
  roles: {
    name: String;
    id: Number;
    people: {
      name: String;
      order: Number;
      id: Number;
      email: String;
      phoneNumber: String;
    }[]  
  }[]
}

interface Person {
  name: String
  order: Number
  id: Number
  email: String
  phoneNumber: String
  roleId: Number
}


interface ContextProps {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
    goTos: GoTo[];
    setGoTos: Dispatch<SetStateAction<GoTo[]>>;
  }
  
const GlobalContext = createContext<ContextProps>({
    projects: [],
    setProjects: () => {},
    goTos: [],
    setGoTos: () => {}
});
  
export const GlobalContextProvider = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [goTos, setGoTos] = useState<GoTo[]>([])
      
    return (
        <GlobalContext.Provider value={{ projects, setProjects, goTos, setGoTos }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
