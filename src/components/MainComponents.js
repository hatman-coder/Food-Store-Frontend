import React from 'react';
import Header from './header/Header';
import Body from './body/Body'
import Footer from './footer/Footer'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Cart from './body/Cart';
import Login from "./body/Login";

  const ProductWrapper = () =>{
    return(
        <div>
            <Header />
            <Body/>
            <Footer />
        </div>
    )
}

  const CartWrapper = () => {
    return(
      <div>
        <Header/>
        <Cart />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductWrapper/>,
    },
    {
        path: "/cart",
        element: <CartWrapper />,
    },
      {
          path: "/login",
          element: <Login/>,
      }
  ]);


  

const MainComponents = () => {
    return(
        <div>
            <RouterProvider router={router} />
        </div>
    )
}



export default MainComponents