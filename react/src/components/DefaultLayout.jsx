import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import Footer from '../views/Footer';
import Header from '../views/Header';

export default function DefaultLayout() {
  
  const {token} = useStateContext();

  if(!token){
    return(
      <Navigate to="/login" />
    );
  }

  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
