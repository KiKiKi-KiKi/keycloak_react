import React from 'react';
import ReactDOM from 'react-dom';
import { keycloak } from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { RecoilRoot } from 'recoil';
import { Observer } from './Observer';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ReactKeycloakProvider authClient={keycloak}>
        <Observer />
        <App />
      </ReactKeycloakProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
