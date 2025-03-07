import React, { createContext, useContext } from "react";
import api from "./api.ts";

type UserContextType = {
    addUser: (username: string, password: string) => Promise<boolean>;
    checkUser: (username: string, password: string) => Promise<boolean>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: {children: React.ReactNode}) {

    /*
    // React Hook appellé on mount pour recuperer les utilisateurs depuis l'API
    useEffect(() => {
        fetchUsers();
    }, []);

    // Appelle le GET endpoint de l'API pour recuperer les utilisateurs
    async function fetchUsers() {
        try {
            const response = await api.get("/users");
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    }
     */

    // Appelle le POST endpoint de l'API pour ajouter un utilisateur
    async function addUser(username: string, password: string) {
        try {
            const success = await api.post("/users", {username: username, password: password});
            return success.data.success;
        } catch (error) {
            console.error("Error while adding user", error);
            return false;
        }
    }

    // Verifie si l'utilisateur est present dans la database
    async function checkUser(username: string, password: string) {
        try {
            const success = await api.post("/check-user", {username: username, password: password});
            console.log(success);
            return success.data.success;
        } catch (error) {
            console.error("Error while adding user", error);
            return false;
        }
    }

    return (
        <UserContext.Provider value={{addUser, checkUser}} >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        console.error("No user provider");
        throw new Error("No user provider");
    }
    return context  ;
}