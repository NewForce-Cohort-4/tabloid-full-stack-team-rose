import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
            }
            { /* When the link My Posts is clicked Applications views is rendered */ }
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/post/currentUser">My Posts</NavLink>
              </NavItem>
            }
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/post">All Posts</NavLink>
              </NavItem>
            }
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/posts/add">Add Post</NavLink>
              </NavItem>
            }

            {isLoggedIn &&
              <NavItem>
               <NavLink tag={RRNavLink} to="/categories">Categories</NavLink>
              </NavItem>
            }

            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/category/add">Add Category</NavLink>
              </NavItem>
            }
          </Nav>

          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
