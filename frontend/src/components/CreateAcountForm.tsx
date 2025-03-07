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
        <main className="h-screen w-screen bg-base-100 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold absolute top-20 w-xs flex justify-center text-center text-base-content">Application d'Authentification</h1>
            <form className="flex flex-col">
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">

                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none"
                               stroke="black">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input type="input"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               placeholder="Username"
                               className="text-black"/>
                    </label>

                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none"
                               stroke="black">
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Password"
                               className="text-black"/>
                    </label>

                    <div className="flex w-full items-center">
                        <button className="btn btn-accent grid h-10 w-30 place-items-center"
                                onClick={handleRegisterSubmit}>S'inscrire
                        </button>
                        <div className="divider divider-horizontal divider-error">ou</div>
                        <button className="btn btn-primary grid h-10 w-30 place-items-center "
                                onClick={handleLoginSubmit}>Se Connecter
                        </button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
}

export default CreateAcountForm;