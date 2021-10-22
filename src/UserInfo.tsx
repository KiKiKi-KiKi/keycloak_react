import { VFC } from 'react';
import { useUser } from './hooks/useUser';

export const UserInfo: VFC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>
        <strong>{user.name}</strong>
      </p>
      <div>
        ID: {user.id}
        <br />
        Email: {user.email} {!user.emailVerified && <small>Unverified</small>}
      </div>
    </div>
  );
};
