import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";


const Navigation = (login_status) => {
    const Logout = () => {
        localStorage.removeItem('jwt')
        window.location.reload()
    }

    const renderHtml = () => {
        if (login_status === true || localStorage.getItem('jwt')) {
            return (
                <>
                    <Navbar style={{color: 'white', backgroundColor: "#304352"}}>
                        <NavbarBrand href="/" style={{color: 'white'}}>
                            Dominoz
                        </NavbarBrand>
                        <Nav>
                            <NavItem><NavLink href="/" style={{color: 'white'}}>Home</NavLink></NavItem>
                            <NavItem><NavLink href='' onClick={() => Logout()}
                                              style={{color: 'white'}}>Logout</NavLink></NavItem>
                            <NavItem>
                                <NavLink href="/cart" style={{color: 'white'}}>
                                    <i className="fa fa-shopping-cart"/>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </>
            )
        } else {
            return (
                <>
                    <Navbar style={{color: 'white', backgroundColor: "#304352"}}>
                        <NavbarBrand href="/" style={{color: 'whitesmoke'}}>
                            <b>Dominoz</b>
                        </NavbarBrand>
                        <Nav>
                            <NavItem><NavLink href="/" style={{color: 'white'}}>Home</NavLink></NavItem>
                            <NavItem><NavLink href="/login" style={{color: 'white'}}
                                              onClick={() => console.log('logging out')}>Login</NavLink></NavItem>
                            <NavItem>
                                <NavLink href="/cart" style={{color: 'white'}}>
                                    <i className="fa fa-shopping-cart"/>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </>
            )
        }

    }

    return (
        <>
            {renderHtml()}
        </>
    )
}

export default Navigation