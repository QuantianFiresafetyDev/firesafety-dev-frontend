import { React, useState } from "react";
import "react-table-v6/react-table.css";
// import Navbar from "../Navbar/Navbar";
import SecondaryNav from "../Layouts/SecondaryNav";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
// import { auditCategoryData } from "../ViewAuditCategories/ViewAuditCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AuditFire from "../../assets/images/AuditFire.PNG";
import LocationLogo from "../../assets/images/LocationLogo.PNG";
import "../Css/Sys.css";
// import DeleteIcon from '@material-ui/icons/Delete';

// import { makeStyles } from '@material-ui/core/styles';
// import TreeView from '@material-ui/lab/TreeView';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import TreeItem from '@material-ui/lab/TreeItem';

import PropTypes from "prop-types";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring";


import NavLogo from "../../assets/images/NavLogo.PNG";
export const NavbarWrapper = styled.div`
  font-size: 16px;
  border-bottom: 1px solid red;
  font-weight: bold;
`;

export const Logo = styled.div`
  margin-left: 18px;
`;

export const CustomButtom = styled.button`
  background: white;
  border: none;
  color: black;
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
`;

function MinusSquare(props) {
  return <img src={AuditFire} alt="try once" />;
}

function PlusSquare(props) {
  return <img src={AuditFire} alt="try once" />;
}

function CloseSquare(props) {
  return <img src={AuditFire} alt="try once" />;
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
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
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `2px solid ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles({
  root: {
    // height: 264,
    flexGrow: 1,
    maxWidth: 400,
    height: "auto",
  },
});

export default function TemplateState() {
  const classes = useStyles();
  // const { id } = useParams();
  const [show, setShow] = useState(true);

  // const allCategoryAudit = auditCategoryData;
  // const auditCatDataById = allCategoryAudit.filter(
  //   (data) => data.audit_cat_id.toString() === id.toString()
  // )[0];
  // const { audit_cat_name } = auditCatDataById;
  // const purple ="orange";
  // const [bg, setBg ] = useState(purple);

  // const bgChange = () =>{
  //  let newBg ='#34495e';
  //  setBg(newBg);
  //   };

  return (
    <>
      <NavbarWrapper>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top sticky-top">
          <Link className="navbar-brand" to="/AddAudits">
            <Logo>
              <img src={NavLogo} alt="try again" />
            </Logo>
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
              <li className="nav-item">
            
            <NavLink
             
              className="nav-link"
              to="/ViewAudits"
              id="navbarDropdown"
              role="button"
            >
               Audits
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

             
            </div>
          </li>
          <li className="nav-item">
          
          <NavLink
          
            className="nav-link"
            to="/ViewUsers"
            id="navbarDropdown"
            role="button"
          >
            Users
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">

           
          </div>
        </li>
        <li className="nav-item">
          
          <NavLink
            exact activeStyle ={{color: 'red', fontWeight: "bold"}}
            className="nav-link"
            to="#"
            id="navbarDropdown"
            role="button"
          >
             Audit Categories
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">

           
          </div>
        </li>
            </ul>
            <div></div>
            <div className="mx-2">Parvezsh</div>
          </div>
        </nav>
      </NavbarWrapper>
      <SecondaryNav />
      {/* <h5 className="cat_audit"><Link to = "/AuditCategories" className= "audit_cat_back_button"><p className="fa fa-angle-left" > </p></Link> NBC new rules  </h5> */}
      <div>
        <div className="d-flex justify-content-between">
          <div className="template_table_top">
            <h5 className="template_audit">
              <Link
                to="/ViewAuditCategories"
                className="audit_template_back_button"
              >
                <p className="fa fa-angle-left"> </p>
              </Link>
             NBC new rules
            </h5>
          </div>
          <div className="template_clone">
            <p className="fa fa-clone"></p>
          </div>
          <div className="template_trash">
            <p>
              <FontAwesomeIcon icon={faTrash} />
            </p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="grand_parent">
            <div className="parents">
              <div className="child">
                {/* <p className = 'audit_template_header'>Systems</p> */}

                {show ? (
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="system_tree1">Systems</div>
                      <div className="system_tree2">
                        <div className="system_tree3" type="submit">
                          <button
                            className="toggle_button_location"
                            onClick={() => setShow(true)}
                          >
                            <img
                              className="loc_logo"
                              src={LocationLogo}
                              alt="try again"
                            />
                          </button>
                          <button
                            className="toggle_button_systems"
                            onClick={() => setShow(false)}
                          >
                            <img
                              className="systems_logo"
                              src={AuditFire}
                              alt="try again"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="audit_template_tree">
                      <TreeAudit>
                        <TreeView
                          className={classes.root}
                          defaultExpanded={["1"]}
                          defaultCollapseIcon={<MinusSquare />}
                          defaultExpandIcon={<PlusSquare />}
                          defaultEndIcon={<CloseSquare />}
                        >
                          <TreeAudit>
                            <StyledTreeItem nodeId="1" label="All Systems">
                              <StyledTreeItem
                                nodeId="2"
                                label="Egress System"
                              />
                              <StyledTreeItem nodeId="4" label="Stairways" />
                              <StyledTreeItem nodeId="5" label="doors" />
                              <StyledTreeItem
                                nodeId="6"
                                label="Walls and Ceilings"
                              />
                            </StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="7"
                              label="Standpipes"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="8"
                              label="Emergency Lighting"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="9"
                              label="Air handling duct systems"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="10"
                              label="Sprinklers"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="11"
                              label="Smoke Detectors"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="12"
                              label="Fire Extinguishers"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="13"
                              label="Street Adress"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="14"
                              label="Exit Signs"
                            ></StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem nodeId="15" label="Meeting Rooms">
                              <StyledTreeItem
                                nodeId="16"
                                label="Emergency Exits"
                              />
                            </StyledTreeItem>
                          </TreeAudit>

                          <TreeAudit>
                            <StyledTreeItem
                              nodeId="17"
                              label="Exit Signs"
                            ></StyledTreeItem>
                          </TreeAudit>
                        </TreeView>
                      </TreeAudit>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="child">
                {show ? (
                  <div>
                    <p className="audit_template_header">Egress Systems</p>
                    <div className="audit_systems">
                      <div className="w-100 audit_template1"></div>
                      <div className="col audit_template2">Description</div>
                      <div className="w-100 audit_template3"></div>
                      <div className="col audit_template_desc">
                        This is the emergency system exits. Each high rise
                        apartment must have an emergency exit system.
                      </div>
                      <div className="w-100 audit_template4"></div>

                      <div className="d-flex justify-content-between">
                        <div className="audit_location">Locations</div>
                        <div className="audit_location_add_button">
                          <button className="au_add_btn" type="submit">
                            Add
                          </button>
                        </div>
                      </div>

                      <div className="w-100 audit_location_box"> </div>
                      <div className="col">
                        <input
                          className="location_box_radius"
                          type="text"
                          id="fname"
                          name="fname"
                        ></input>
                      </div>

                      <div className="w-100 sub_systems"> </div>
                      <div className="d-flex justify-content-between">
                        <div className="audit_subsystems">Sub Systems</div>
                        <div className="audit_subsystems_add_button">
                          <button
                            className="au_subsystems_add_btn"
                            type="submit"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      <div className="w-100 audit_sub_location1_box"> </div>
                      <div className="col">
                        <input
                          className="sub_location1_box_radius"
                          type="text"
                          id="fname"
                          name="fname"
                        ></input>
                      </div>

                      <div className="w-100 audit_sub_location2_box"> </div>
                      <div className="col">
                        <input
                          className="sub_location2_box_radius"
                          type="text"
                          id="fname"
                          name="fname"
                        ></input>
                      </div>

                      <div className="w-100 audit_sub_location3_box"> </div>
                      <div className="col">
                        <input
                          className="sub_location3_box_radius"
                          type="text"
                          id="fname"
                          name="fname"
                        ></input>
                      </div>

                      <div className="w-100 help_articles"> </div>

                      <div className="d-flex justify-content-between">
                        <div className="help_articles_text">Help Articles</div>
                        <div className="help_articles_add_button">
                          <button
                            className="au_help_articles_add_btn"
                            type="submit"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="w-100 help_articles_box"> </div>
                      <div className="col">
                        <input
                          className="help_articles_box_radius"
                          type="text"
                          id="fname"
                          name="fname"
                        ></input>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="child">
                {show ? (
                  <div>
                    <p className="audit_template_header">Checklist</p>
                    <div className="w-100 checklist1"></div>
                    <div className="col checklist2">None</div>
                    <div className="w-100 checklist3"></div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="template_btns_margin">
            <button type="submit" className="save_audit_template_btn">
              Save
            </button>
            <button type="submit" className="cancel_audit_template_btn">
              Cancel
            </button>
            <button type="submit" className="savedraft_audit_template_btn">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
