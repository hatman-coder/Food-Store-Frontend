import { Nav, Navbar, NavbarBrand, NavLink, NavItem } from "reactstrap";


const Navigation = () => {

    return(
        <div>
            <Navbar color="black">
                <NavbarBrand href="/" style={{color: 'white'}}>
                    Dominoz
                </NavbarBrand>
                <Nav>
                    <NavItem><NavLink href="/" style={{color: 'white'}}>Home</NavLink></NavItem>
                    <NavItem><NavLink href="/login" style={{color: 'white'}}>Login</NavLink></NavItem>
                    <NavItem>
                        <NavLink href="/cart" style={{color: 'white'}}>
                            <i className="fa fa-shopping-cart" />
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Navigation