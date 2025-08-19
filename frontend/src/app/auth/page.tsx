/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { MyAppHook } from '@/context/app_provider';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface FormData {
  name?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

const initialData: FormData = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
};

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>(initialData);

  const router = useRouter();

  const { login, register, authToken, isLoading } = MyAppHook();

  useEffect(() => {
    if (authToken) {
      router.push('/dashboard');
      return;
    }
  }, [authToken, isLoading]);

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      loginUser(formData.email, formData.password);
    } else {
      registerUser(
        formData.name!,
        formData.email,
        formData.password,
        formData.confirm_password!
      );
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error(`Authentication error: ${error}`);
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    confirm_password: string
  ) => {
    try {
      await register(name, email, password, confirm_password);
    } catch (error) {
      console.error(`Authentication error: ${error}`);
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-4' style={{ width: '400px' }}>
        <h3 className='text-center'>{isLogin ? 'Login' : 'Register'}</h3>
        <form onSubmit={handleFormSubmit}>
          {!isLogin && (
            <input
              className='form-control mb-2'
              name='name'
              type='text'
              placeholder='Name'
              required
              value={formData.name}
              onChange={handleOnInputChange}
            />
          )}

          <input
            className='form-control mb-2'
            name='email'
            type='email'
            placeholder='Email'
            required
            value={formData.email}
            onChange={handleOnInputChange}
          />
          <input
            className='form-control mb-2'
            name='password'
            type='password'
            placeholder='Password'
            required
            value={formData.password}
            onChange={handleOnInputChange}
          />
          {!isLogin && (
            <input
              className='form-control mb-2'
              name='confirm_password'
              type='password'
              placeholder='Confirm Password'
              required
              value={formData.confirm_password}
              onChange={handleOnInputChange}
            />
          )}

          <button className='btn btn-primary w-100' type='submit'>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className='mt-3 text-center'>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: 'pointer' }}
          >
            {isLogin ? ' Register' : ' Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
