import React from "react";
import './css/Reset.css';
import './css/App.css';
import './components/Login';
import Login from './components/Login';
import Chat from './components/Chat';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Chat />
          </div>
        )
      }
    </div>
  );
}

export default App;
