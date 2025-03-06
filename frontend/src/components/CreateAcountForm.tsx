import React, {useState} from 'react';
import {useUser} from "../UserContext.tsx";
import {useNavigate} from "react-router-dom";

// Component pour créer un compte
function CreateAcountForm() {

    const {addUser, checkUser} = useUser();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    // Fonction utilisé lorsque que l'utilisateur envoie le form d'inscription
    async function handleRegisterSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (username && password) {
            const success = await addUser(username, password);
            if(success) {
                navigate(`/connected/${username}`)
            } else {
                alert("Utilisateur existant");
            }
            setUsername("");
            setPassword("");
        }
    }

    // Fonction utilisé lorsque que l'utilisateur envoie le form de connexion
    async function handleLoginSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (username && password) {
            const success = await checkUser(username, password);
            if (success)
            {
                navigate(`/connected/${username}`)
            }
            else {
                alert("Pas de compte correspondant");
            }
            setUsername("");
            setPassword("");
        }
    }

    return (
        <form>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                   placeholder="Username"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"/>
            <button type="button" onClick={handleRegisterSubmit}>S'inscrire</button>
            <button type="button" onClick={handleLoginSubmit}>Se Connecter</button>
        </form>
    );
}

export default CreateAcountForm;