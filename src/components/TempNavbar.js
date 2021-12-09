import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import '../Css/Sys.css';


import NavLogo from '../../assets/images/NavLogo.PNG';
export const NavbarWrapper = styled.div`
  font-size: 16px;
  border-bottom: 2px solid red

`

export const Logo = styled.div`
 margin-left: 18px;


`

export const CustomButtom = styled.button`
  background: white;
  border : none;
  color : black;
`;

export const But = styled.div`

color: red;
`

function Navbar() {
  return (
    <NavbarWrapper>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top sticky-top">
        <Link className="navbar-brand" to="/AddAudits">
        <Logo> <img src={NavLogo} alt="try again" /></Logo>
       
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" to="#">
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown" >
            
              <NavLink
              exact
              activeStyle ={{color: 'red', fontWeight: "bold"}}
             className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Audits
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/AddAudits">
                  Add Audits
                </Link>
                <Link className="dropdown-item" to="/ViewAudits">
                  View Audits
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Users
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/AddUsers">
                  Add Users
                </Link>
                <Link className="dropdown-item" to="/ViewUsers">
                  View Users
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink
             
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown3"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Audit Categories
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/AddAuditCategories">
                  Add Audit Categories
                </Link>
                <Link className="dropdown-item" to="/ViewAuditCategories">
                  View Audit Categories
                </Link>
              </div>
            </li>
          </ul>
          <div></div>
          <div className="mx-2">
          
              Parvezsh
          
          </div>
        </div>
      </nav>
    </NavbarWrapper>
  );
}
export default Navbar;
