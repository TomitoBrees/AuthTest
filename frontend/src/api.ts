import axios from 'axios';

// Definition de l'API et lien vers le serveur du backend.
const api = axios.create({baseURL: "http://localhost:8000"});

export default api;