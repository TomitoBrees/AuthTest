import React, { createContext, useContext, useState, useEffect } from "react";
import api from "./api.ts";

type User = {
    username: string;
    password: string;
}

type UserContextType = {
    users: User[];
    addUser: (username: string, password: string) => Promise<boolean>;
    checkUser: (username: string, password: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: {children: React.ReactNode}) {
    const [users, setUsers] = useState<User[]>([]);

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

    // Appelle le POST endpoint de l'API pour ajouter un utilisateur
    async function addUser(username: string, password: string) {
        try {
            await api.post("/users", {username: username, password: password});
            fetchUsers();
            return true;
        } catch (error) {
            console.error("Error while adding fruit", error);
            return false;
        }
    }

    async function checkUser(username: string, password: string) {
        fetchUsers();
        return users.some(user => user.username == username && user.password == password)
    }

    return (
        <UserContext.Provider value={{users, addUser, checkUser}} >
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
    return context;
}