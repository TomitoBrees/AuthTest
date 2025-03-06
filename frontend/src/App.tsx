import { Routes, Route } from "react-router-dom";
import {UserProvider} from "./UserContext.tsx";
import CreateAcountForm from "./components/CreateAcountForm.tsx";
import Connected from "./components/Connected.tsx";
import './App.css'

function App() {

  return (
      <UserProvider>
        <Routes>
            <Route path="/"element={<CreateAcountForm />} />
            <Route path="/connected/:username" element={<Connected />}/>
        </Routes>
      </UserProvider>
  );
}

export default App
