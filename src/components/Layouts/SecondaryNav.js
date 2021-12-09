import React from "react";
import styled from 'styled-components';
import '../Css/SecondaryNav.css';
export const NavbarWrapper = styled.div`
  font-size: 14px;
  border-bottom: 1px solid red;



`
export const CustomButtom = styled.button`
  background: white;
  border : none;
  color : black;
`;

function SecondaryNav() {
  return (
    <div>
    <div className="wrapper">
      <nav>
        <input type="checkbox" id="show-search" />
        <input type="checkbox" id="show-menu" />
        <label htmlFor="show-menu" className="menu-icon"><i className="fas fa-bars" /></label>
        <div className="content">
      
     
        </div>
      
      </nav>
    </div>
  </div>
  );
}
export default SecondaryNav;
