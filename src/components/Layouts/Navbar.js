import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import '../Css/Sys.css';
import NavLogo from '../../assets/images/NavLogo.PNG';
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
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

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logout())
  }

  return (
    <NavbarWrapper>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top sticky-top">
        <Link className="navbar-brand" to="/ViewAudits">
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
            <li className="nav-item" >
              <NavLink
                activeStyle={{ color: 'red', fontWeight: "bold" }}
                className="nav-link"
                to="/viewAudits"
                id="navbarDropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Audits
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeStyle={{ color: 'red', fontWeight: "bold" }}
                className="nav-link"
                to="/viewUsers"
                id="navbarDropdown"
                role="link"
                // aria-haspopup="true"
                aria-expanded="false"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeStyle={{ color: 'red', fontWeight: "bold" }}
                className="nav-link"
                to="/viewAuditCategories"
                id="navbarDropdown3"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Audit Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeStyle={{ color: 'red', fontWeight: "bold" }}
                className="nav-link"
                to="/viewArticles"
                id="navbarDropdown3"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Help Articles
              </NavLink>
            </li>
          </ul>
          <div></div>
          <div className="mx-2">
            <button
                className = "btn btn-md btn-danger text-white"
                onClick={(e) => handleLogout(e)}
            >Logout</button>

          </div>
        </div>
      </nav>
    </NavbarWrapper>
  );
}
export default Navbar;
