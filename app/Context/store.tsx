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
  icon: Number;
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
}



interface ContextProps {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
    goTos: GoTo[];
    setGoTos: Dispatch<SetStateAction<GoTo[]>>;
    people: Person[];
    setPeople: Dispatch<SetStateAction<Person[]>>;
    noEditing: boolean;
    setNoEditing: Dispatch<SetStateAction<boolean>>;
  }
  
const GlobalContext = createContext<ContextProps>({
    projects: [],
    setProjects: () => {},
    goTos: [],
    setGoTos: () => {},
    people: [],
    setPeople: () => {},
    noEditing: false,
    setNoEditing: () => {},
});
  
export const GlobalContextProvider = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [goTos, setGoTos] = useState<GoTo[]>([])
    const [people, setPeople] = useState<Person[]>([])
    const [noEditing, setNoEditing] = useState(false);
      
    return (
        <GlobalContext.Provider value={{ projects, setProjects, goTos, setGoTos, people, setPeople, noEditing, setNoEditing }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
