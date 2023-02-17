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
    people: Person[]
  }[]
}

interface Person {
  name: string;
  order: number;
  id: number;
  email: string;
  phoneNumber: string;
  roleId: number;
  index: number;
}


interface ContextProps {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
    goTos: GoTo[];
    setGoTos: Dispatch<SetStateAction<GoTo[]>>;
    people: Person[];
    setPeople: Dispatch<SetStateAction<Person[]>>;
  }
  
const GlobalContext = createContext<ContextProps>({
    projects: [],
    setProjects: () => {},
    goTos: [],
    setGoTos: () => {},
    people: [],
    setPeople: () => {}

});
  
export const GlobalContextProvider = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [goTos, setGoTos] = useState<GoTo[]>([])
    const [people, setPeople] = useState<Person[]>([])
      
    return (
        <GlobalContext.Provider value={{ projects, setProjects, goTos, setGoTos, people, setPeople }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
