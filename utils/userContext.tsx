import { createContext, Dispatch, SetStateAction } from 'react';
import { decodedType } from '../types';

type userProps = {
  user: decodedType | undefined;
  setUser: Dispatch<SetStateAction<decodedType | undefined>>;
};

export const userContext = createContext<userProps>({
  user: undefined,
  setUser: () => {},
});
