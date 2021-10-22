import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';
import { useUser } from './hooks/useUser';
import { UserInfo } from './UserInfo';
import './App.css';

function App() {
  const { keycloak, initialized } = useKeycloak();
  const { isLoading, destroyUser } = useUser();
  const isAuthenticated = !!keycloak.authenticated;

  const handleLogin = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  const handleLogout = useCallback(async () => {
    await keycloak.logout();
    destroyUser();
  }, [keycloak, destroyUser]);

  console.log({ keycloak, initialized });

  return (
    <div className="App">
      <h1>Hello, Keycloak App</h1>
      {!isLoading && (
        <div>
          <div>{`User is ${!isAuthenticated ? 'NOT ' : ''}authenticated`}</div>
          <UserInfo />
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
      )}
    </div>
  );
}

export default App;
