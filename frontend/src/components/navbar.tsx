'use client';

import { MyAppHook } from '@/context/app_provider';
import Link from 'next/link';

const Navbar = () => {
  const { logout, authToken } = MyAppHook();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <Link className='navbar-brand' href='/'>
          Laravel NextJS
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            {authToken ? (
              <>
                {/* <!-- When user is authenticated --> */}
                <li className='nav-item'>
                  <a className='nav-link' href='/dashboard'>
                    Dashboard
                  </a>
                </li>
                <li className='nav-item'>
                  <button className='btn btn-danger ms-2' onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* When user is not authenticated */}
                <li className='nav-item'>
                  <Link className='nav-link' href='/'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/auth'>
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
