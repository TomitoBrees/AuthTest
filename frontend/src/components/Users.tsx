import { useEffect, useState} from 'react';
import api from "../api.ts";
import CreateAcountForm from "./CreateAcountForm.tsx";

type User = {
    username: string;
    password: string;
}

function UserList() {
    const [users, setUsers] = useState<User[]>([]);

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
        } catch (error) {
            console.error("Error while adding fruit", error);
        }
    }

    // React Hook appellé on mount pour recuperer les utilisateurs depuis l'API
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Utilisateurs</h2>
            <ul>
                {users.map((user, index) => (<li key={index}>{user.username}</li>))}
            </ul>
            <CreateAcountForm addUser={addUser} />
        </div>
    );
}

export default UserList;