import React, { useState } from "react";
import { Nav, Navbar, NavbarBrand, NavLink, NavItem } from "reactstrap";


const Navigation = () => {
    const [data, setData] = useState([])
const get_Cart = (Cart) => {
    var a = localStorage.getItem('item')
    setData(a)
    alert(data)
    return(
        <div>
            {data}
        </div>
    )
}


    return(
        <div>
            <Navbar color="black">
                <NavbarBrand href="/" style={{color: 'white'}}>
                    Dominoz
                </NavbarBrand>
                <Nav>
                    <NavItem><NavLink href="/home" style={{color: 'white'}}>Home</NavLink></NavItem>
                    <NavItem><NavLink href="/login" style={{color: 'white'}}>Login</NavLink></NavItem>
                    <NavItem>
                        <NavLink  onClick={get_Cart} style={{color: 'white'}}>
                            <i className="fa fa-shopping-cart" />
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Navigation