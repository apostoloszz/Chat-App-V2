import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };

  return (
      <div className="App">
        {!isLoggedIn ? (
            <div className="login-container">
              <h1>Welcome to Chat App</h1>
              <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
        ) : (
            <ChatWindow username={username} />
        )}
      </div>
  );
}

export default App;
