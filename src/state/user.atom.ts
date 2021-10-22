import { atom } from 'recoil';
import { STATE_USER } from './keys';

export interface IUserState {
  id: string;
  name: string;
  email: string | null;
  emailVerified: boolean | null;
}

export const BeforeLoadUser = undefined;
export const NoUser = null;

export type UserStateType = IUserState | typeof BeforeLoadUser | typeof NoUser;

export const userState = atom<UserStateType>({
  key: STATE_USER,
  default: undefined,
});
