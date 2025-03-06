import UserList from "./components/Users.tsx";
import './App.css'

function App() {

  return (
      <div className="App">
          <header className="App-header">
              <h1>User Management App</h1>
          </header>
          <main>
              <UserList />
          </main>
      </div>
  );
}

export default App
