import React, {useState} from 'react';

// Type pour le parametre passé en argument (props) du component principal
type CreateAccountFormProps = {
    addUser: (username: string, password: string) => void;
};

// Component pour créer un compte
function CreateAcountForm({ addUser }: CreateAccountFormProps) {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // Fonction utilisé lorsque que l'utilisateur envoie le forms d'insctiption
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (username) {
            addUser(username, password);
            setUsername('');
            setPassword('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <button type="submit">Create Account</button>
        </form>
    );
}

export default CreateAcountForm;