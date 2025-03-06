import { useParams, useNavigate} from "react-router-dom";

function Connected() {
    const {username} = useParams();
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    return (
        <div>
            <h1>{username} est connecté !</h1>
            <button onClick={handleLogout}>Déconnexion</button>
        </div>
    )
}

export default Connected;