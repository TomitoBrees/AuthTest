import { useParams, useNavigate} from "react-router-dom";

function Connected() {
    const {username} = useParams();
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    return (
        <main className="h-screen w-screen bg-base-100 flex flex-col justify-center items-center gap-10">
            <h1 className="text-2xl font-bold flex justify-center text-center text-base-content"><span className="text-primary-content">{username}</span>&nbsp;est connecté !</h1>
            <button className="btn btn-error btn-lg" onClick={handleLogout}>Déconnexion</button>
        </main>
    )
}

export default Connected;