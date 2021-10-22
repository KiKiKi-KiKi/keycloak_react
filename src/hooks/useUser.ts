import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import {
  userState,
  BeforeLoadUser,
  UserStateType,
  NoUser,
  IUserState,
} from '../state/user.atom';

type UpdateUserFunc = (user: IUserState | typeof NoUser) => void;

interface IUseUser {
  user: UserStateType;
  isLoading: boolean;
  updateUser: UpdateUserFunc;
  destroyUser: () => void;
}

export const useUser = (): IUseUser => {
  const [user, setUser] = useRecoilState(userState);
  const isLoading = user === BeforeLoadUser;

  const updateUser: UpdateUserFunc = useCallback(
    (user) => {
      setUser(user);
    },
    [setUser]
  );

  const destroyUser = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return {
    user,
    isLoading,
    updateUser,
    destroyUser,
  };
};
