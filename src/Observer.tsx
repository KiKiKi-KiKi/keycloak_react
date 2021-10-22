import { useCallback, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useUser } from './hooks/useUser';

export const Observer = (): null => {
  const { keycloak, initialized } = useKeycloak();
  const isAuthenticated = !!keycloak.authenticated;
  const { updateUser, destroyUser } = useUser();

  const setUserInState = useCallback(async () => {
    // KeycloakUserInfo is Undocumented!
    // cf. https://github.com/keycloak/keycloak/blob/a5c8c455510f8f637dc1d8ceb99538c8eece7096/adapters/oidc/js/src/main/resources/keycloak.d.ts#L458
    const userInfo = (await keycloak.loadUserInfo()) as { sub?: string };
    const user = await keycloak.loadUserProfile();
    const userId = userInfo?.sub;

    console.log({
      info: userInfo,
      profile: user,
    });

    if (!user || !userId) {
      updateUser(null);
      return;
    }

    updateUser({
      // user.id => undefined
      id: userId,
      // user.username => email
      name: [user.firstName, user.lastName].join(' ') || user.username!,
      email: user.email || null,
      emailVerified: user.emailVerified || null,
    });
  }, [keycloak, updateUser]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (!isAuthenticated) {
      destroyUser();
      return;
    }

    setUserInState();

    return () => {
      destroyUser();
    };
  }, [isAuthenticated, initialized, destroyUser, setUserInState]);

  return null;
};
