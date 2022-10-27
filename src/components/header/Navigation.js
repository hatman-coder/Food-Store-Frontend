import React from "react";
import { Navbar, NavbarBrand, NavLink } from "reactstrap";
import Cart from '../body/Cart'

const Navigation = () => {
    return(
        <div>
            <Navbar dark color='dark'>
                <div className="container">
                    <NavbarBrand href="/">
                        Dominoz
                    </NavbarBrand>
                    <NavLink style={{color: 'white', display: 'block', alignContent: 'center'}} href={<Cart/>}>
                        SignUp
                    </NavLink>
                </div>
            </Navbar>
        </div>
    )
}

export default Navigation