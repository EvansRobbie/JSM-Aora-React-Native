import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { getCurrentUser } from '../lib/appwrite';

interface userProps {
  $id: string;
  email: string;
  username: string;
  avatar:string
}

interface createContextProps {
  isLoggedin: boolean;
  user: userProps | null;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<userProps | null>>;
}

const GlobalContext = createContext<createContextProps>({} as createContextProps);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<userProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await getCurrentUser();
        setIsLoggedIn(true);
        setUser(res);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
  const value = {
    isLoggedin,
    isLoading,
    user,
    setUser,
    setIsLoading,
    setIsLoggedIn,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
