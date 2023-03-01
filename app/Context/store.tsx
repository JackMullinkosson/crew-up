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
  defaultGoTo: Boolean;
  roles: Role[]
  projectId: Number;
}

interface Role {
  name: String;
  id: Number;
  goToId: Number;
  people: Person[]
}

interface Person {
  name: string;
  order: number;
  id: number;
  email: string;
  phoneNumber: string;
  roleId: number;
  goToId: number;
}



interface ContextProps {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
    goTos: GoTo[];
    setGoTos: Dispatch<SetStateAction<GoTo[]>>;
    roles: Role[];
    setRoles: Dispatch<SetStateAction<Role[]>>;
    people: Person[];
    setPeople: Dispatch<SetStateAction<Person[]>>;
    noEditing: boolean;
    setNoEditing: Dispatch<SetStateAction<boolean>>;
    isPosting: boolean;
    setIsPosting: Dispatch<SetStateAction<boolean>>;
  }
  
const GlobalContext = createContext<ContextProps>({
    projects: [],
    setProjects: () => {},
    goTos: [],
    setGoTos: () => {},
    roles: [],
    setRoles: () => {},
    people: [],
    setPeople: () => {},
    noEditing: false,
    setNoEditing: () => {},
    isPosting: false,
    setIsPosting: () => {},
});
  
export const GlobalContextProvider = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [goTos, setGoTos] = useState<GoTo[]>([])
    const [roles, setRoles] = useState<Role[]>([])
    const [people, setPeople] = useState<Person[]>([])
    const [noEditing, setNoEditing] = useState(false);
    const [isPosting, setIsPosting] = useState(false)
      
    return (
        <GlobalContext.Provider value={{ projects, setProjects, goTos, setGoTos, roles, setRoles, people, setPeople, noEditing, setNoEditing, isPosting, setIsPosting }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
