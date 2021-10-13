import Keycloak from 'keycloak-js';

const KeycloakCongig = {
  url: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'react-app',
} as const;

//@ts-ignore
export const keycloak = new Keycloak(KeycloakCongig);
