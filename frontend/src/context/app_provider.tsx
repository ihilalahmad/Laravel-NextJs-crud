/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Loader from '@/components/loader';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AppProviderType {
  isLoading: boolean;
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  logout: () => void;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const AppContext = createContext<AppProviderType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (token) {
      setAuthToken(token);
    } else {
      router.push('/auth');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.data.status) {
        Cookies.set('authToken', response.data.access_token, { expires: 7 });
        toast.success('Login successfull');
        setAuthToken(response.data.access_token);
        router.push('/dashboard');
      } else {
        toast.error('Invalid login credentials');
      }

      console.log(`Login Res: ${response}`);
    } catch (error) {
      console.error(`Login API error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirm_password: string
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        confirm_password,
      });
      console.log(`Register res: ${response}`);
    } catch (error) {
      console.error(`Registeration API error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    Cookies.remove('authToken');
    setIsLoading(false);
    toast.success('User logged out successfully');
    router.push('/auth');
  };

  return (
    <AppContext.Provider
      value={{ login, register, logout, isLoading, authToken }}
    >
      {isLoading ? <Loader /> : children}
    </AppContext.Provider>
  );
};

export const MyAppHook = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Context will be wrapped inside AppProvider');
  }

  return context;
};
