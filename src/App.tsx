import { useKeycloak } from '@react-keycloak/web';
import React, { useCallback } from 'react';
import './App.css';

function App() {
  const { keycloak, initialized } = useKeycloak();
  const isAuthenticated = !!keycloak.authenticated;

  const handleLogin = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  const handleLogout = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  console.log({ auth: keycloak.authenticated });
  console.log({ keycloak, initialized });

  return (
    <div className="App">
      <h1>Hello, Keycloak App</h1>
      <div>
        <div>
          <p>{`User is ${!isAuthenticated ? 'NOT ' : ''}authenticated`}</p>
        </div>
        {isAuthenticated ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                keycloak.register();
              }}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
