import { React } from "react";
import "react-table-v6/react-table.css";
// import Navbar from "../Navbar/Navbar";
import SecondaryNav from './Layouts/SecondaryNav';
import styled from 'styled-components';
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import AuditFire from '../../assets/images/AuditFire.PNG';
import '../Css/Sys.css';
import '../Css/SideBar.css';


// import { makeStyles } from '@material-ui/core/styles';
// import TreeView from '@material-ui/lab/TreeView';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import TreeItem from '@material-ui/lab/TreeItem';

import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring';





import NavLogo from '../../assets/images/NavLogo.PNG';
export const NavbarWrapper = styled.div`
  font-size: 16px;
  border-bottom: 1px solid red;
  font-weight: bold;

`

export const Logo = styled.div`
 margin-left: 18px;


`

export const CustomButtom = styled.button`
  background: white;
  border : none;
  color : black;
`;


// const useStyles = makeStyles({
//   root: {
//     height: 240,
//     flexGrow: 1,
//     maxWidth: 400,
//   },
// });

const TreeAudit = styled.div`
margin-bottom: 9px;
position: relative;
top: -7px;
`

function MinusSquare(props) {
  return (
    <img src ={AuditFire} alt ='try once' />
  );
}

function PlusSquare(props) {
  return (
   <img src ={AuditFire} alt ='try once'  />
  );
}

function CloseSquare(props) {
  return (
    <img src ={AuditFire} alt ='try once' />
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px solid ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => <StyledTreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  
    
  },
});



export default function TempAuditTemplate() {
  const classes = useStyles();
  

//   const history = useHistory();
 
  return (
   
    <>
     
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
             exact activeStyle ={{color: 'red', fontWeight: "bold"}} 
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
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
      <SecondaryNav/> 
      <h5 className="cat_audit"><Link to = "/AuditCategories" className= "audit_cat_back_button"><p className="fa fa-angle-left" > </p></Link> NBC new rules  </h5>
    
<div>

<div className="grand_parent">
		
			<div className="parents">
				<div class="child">
					<p className = 'audit_template_header'>Systems</p>
          

          <div className = 'audit_template_tree'>
          
          <TreeAudit>
          <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
    >

    <TreeAudit>
      <StyledTreeItem nodeId="1" label="All Systems">
        <StyledTreeItem nodeId="2" label="Egress System" />  
        <StyledTreeItem nodeId="4" label="Stairways" />
        <StyledTreeItem nodeId="5" label="doors" />
        <StyledTreeItem nodeId="6" label="Walls and Ceilings" />
      </StyledTreeItem>
</TreeAudit>
     
  
     <TreeAudit>
      <StyledTreeItem nodeId="7" label="Standpipes">
      </StyledTreeItem>

      </TreeAudit>

      <TreeAudit>
      <StyledTreeItem nodeId="8" label="Emergency Lighting">
      </StyledTreeItem>
      </TreeAudit>

      <TreeAudit>
      <StyledTreeItem nodeId="9" label="Air handling duct systems">
      </StyledTreeItem>
      </TreeAudit>


      <TreeAudit>
      <StyledTreeItem nodeId="10" label="Sprinklers">
      </StyledTreeItem>
      </TreeAudit>

      <TreeAudit>
      <StyledTreeItem nodeId="11" label="Smoke Detectors">
      </StyledTreeItem>
      </TreeAudit>
       
      <TreeAudit>
      <StyledTreeItem nodeId="12" label="Fire Extinguishers">
      </StyledTreeItem>
      </TreeAudit>


      <TreeAudit>
      <StyledTreeItem nodeId="13" label="Street Adress">
      </StyledTreeItem>
      </TreeAudit>

      <TreeAudit>
      <StyledTreeItem nodeId="14" label="Exit Signs">
      </StyledTreeItem>
      </TreeAudit>

      <TreeAudit>
      <StyledTreeItem nodeId="15" label="Meeting Rooms">
        <StyledTreeItem nodeId="16" label="Emergency Exits" />  
      </StyledTreeItem>
      </TreeAudit>


      <TreeAudit>
      <StyledTreeItem nodeId="17" label="Exit Signs">
      </StyledTreeItem>
      </TreeAudit>

    </TreeView>
    </TreeAudit>
    </div>
                    
				</div>
				<div className="child">
					<p className = 'audit_template_header'>Egress Systems</p>
           
				</div>
				<div className="child">
					<p className = 'audit_template_header'>Checklist</p>
				</div>
			</div>
		</div>
</div>
    
    

    </>
  );
}


