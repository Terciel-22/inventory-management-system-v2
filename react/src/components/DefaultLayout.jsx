import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import Footer from '../views/Footer';
import Header from '../views/Header';

export default function DefaultLayout() {
  
  const {token, notification} = useStateContext();

  if(!token){
    return(
      <Navigate to="/login" />
    );
  }

  return (
    <>
      <Header/>
      <main>
        {notification && <div className="notification">
          {notification}
        </div>}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
