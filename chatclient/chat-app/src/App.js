// import React, { useState } from "react";
// import ChatWindow from "./components/ChatWindow";

// function App() {
//   const [username, setUsername] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     if (username.trim()) {
//       setIsLoggedIn(true);
//     }
//   };

//   return (
//       <div className="App">
//         {!isLoggedIn ? (
//             <div className="login-container">
//               <h1>Welcome to Chat App</h1>
//               <input
//                   type="text"
//                   placeholder="Enter your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//               />
//               <button onClick={handleLogin}>Login</button>
//             </div>
//         ) : (
//             <ChatWindow username={username} />
//         )}
//       </div>
//   );
// }

// export default App;

import axios from 'axios';
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    if (username.trim() && password.trim()) {
      try {
        const response = await axios.post('http://localhost:8080/api/users/login', 
          { username: username, password: password },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Invalid password');
        } else if (error.response && error.response.status === 404) {
          alert('User not found');
        } else {
          console.error('Error logging in:', error);
          alert('Error logging in');
        }
      }
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
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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







