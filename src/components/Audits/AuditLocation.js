import { React, useState, useEffect } from "react";
import "react-table-v6/react-table.css";
// import Navbar from "../Navbar/Navbar";
import SecondaryNav from "../Layouts/SecondaryNav";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { API_URL_BASE } from "../../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LocationLogo from "../../assets/images/LocationLogo.PNG";
import { errorToaster, successToaster } from "common/common";
import AuditFire from "../../assets/images/AuditFire.PNG";
import { useSelector } from "react-redux";
import "../Css/Sys.css";
// import DeleteIcon from '@material-ui/icons/Delete';
// import { makeStyles } from '@material-ui/core/styles';
// import TreeView from '@material-ui/lab/TreeView';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import TreeItem from '@material-ui/lab/TreeItem';

import PropTypes from "prop-types";
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring";

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

export const AddLocationButton = styled.button`
  border : 1px solid red;
  border-radius : 5px;
  height : 24px;
  width : auto;
  display : flex;
  align-items : center;
  justify-content : center;
  margin-top : 5px;
`;

export const LocationInput = styled.input`
  height : 24px;
  border-radius : 5px;
  border : 1px solid black;
  width : auto;
  color : black;
  font-size : 12px;
  text-align : center;
`

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

export const AuditLocationSwitch = () => {
  const history = useHistory();
  return (
    <div className="system_tree3" type="submit">
      <button className="toggle_button_location" onClick={()=>history.push('/AuditLocation')}>
        <img
          className="loc_logo"
          src={LocationLogo}
          alt="try again"
        />
      </button>
      <button className="toggle_button_systems" onClick={()=>history.push('/AuditTemplate/1')}>
        <img
          className="systems_logo"
          src={AuditFire}
          alt="try again"
        />
      </button>
    </div>
  )
}

function MinusSquare(props) {
  return <img src={LocationLogo} alt="try once" />;
}

function PlusSquare(props) {
  return <img src={LocationLogo} alt="try once" />;
}

function CloseSquare(props) {
  return <img src={LocationLogo} alt="try once" />;
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
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
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


// const NavSpace = styled.div`
//   margin-left: 1rem;
// `

const newLocationTemplate = {
  sublocations : [],
  description : '',
  related_systems : [],
  help_articles : {},
  isSubLocation: false,
  isSaved : false,
  isDraft : false
};

export default function AuditLocation() {
  const classes = useStyles();
  // const { id } = useParams();
  // const [show,setShow]=useState(true)
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  const [subLocationInput, setSubLocationInput] = useState('');
  const [currentClickedPath, setCurrentClickedPath] = useState('')
  const [articles , setArticles] = useState([]);
  const [newLocationName, setNewLocationName] = useState('');
  const token = useSelector((state)=> state.user.token)

  useEffect(() => {
    // if(id){
      fetch(`${API_URL_BASE}/location/locationAll`).then(res => res.json()).then(res => setLocations(res.body))
    // }
    fetch(`${API_URL_BASE}/articles/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => setArticles(data.body))
    // if(currentSystem?.id){
    //   fetch(`${API_URL_BASE}auditCategories/getQuestions/${id}`).then(res => res.json()).then(res => setList(res.body))
    // }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCurrentLocation({...currentLocation})
    console.log(locations)
    // eslint-disable-next-line
  }, [locations])

  const onLocationClick = async (e , location) => {
    setCurrentClickedPath(location.path)
   await fetch(`${API_URL_BASE}/location/getLocationById/${location.id}`).then(res => res.json()).then(res => setCurrentLocation(res.body));
  //  await fetch(`${API_URL_BASE}auditCategories/getQuestions/${location.id}`).then(res => res.json()).then(res => setList(res.body));
   console.log(e.target)
  }

  const onSubLocationInputChange = (e) => {
    setSubLocationInput(e.target.value)
  }

  const onLocationInputChange = (e) => {
    const locationLabel = e.target.value;
    setNewLocationName(locationLabel);
  }
  

  const addSubLocation = () => {
    console.log("add sub location", subLocationInput, currentLocation)
    if(subLocationInput !== ''){
      const newLocation = {
        ...newLocationTemplate,
        name : subLocationInput,
        parentlocationId : currentLocation.id, 
        isSubLocation : true,
        path: currentClickedPath+`/${subLocationInput}`
      }
      console.log('newSubSystem: ', newLocation)
      fetch(`${API_URL_BASE}/location/createSubLocation`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(newLocation)
      }).then(res => res.json()).then(res => {
        if(res.success){
          successToaster(res.message)
          setCurrentLocation(res.body)
        } 
        if(res.error){
          errorToaster(res.message)
        }
      }).then(() => setLocations(locations))
    //  const allSystem = [...systems];
    //  const index = allSystem.findIndex(item => item.label === currentSystem.label);
    //  const newSubSystem = allSystem[index].subsystem.concat([subSystemInput])
    //  const system = {
    //    ...allSystem[index],
    //    subsystem : newSubSystem,
    //  }
    //  allSystem[index] = system;
    //  setSystem(allSystem)
    setSubLocationInput('');
    }
  }

  const addRelatedSystems = () => {
    
  }

  const addHelpArticles = () => {
    
  }
  
  const addLocation = () => {
    const label = newLocationName
    console.log('newLocationName: ', newLocationName)
    if(label !== ''){
      const newLocation = {
        ...newLocationTemplate,
        name : label,
        parentlocationId : '', 
        isSubLocation : false,
        path: '/'+label
      }
      console.log('newLocation: ', newLocation)
      setNewLocationName('')
      fetch(`${API_URL_BASE}/location/createLocation`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(newLocation)
      }).then(res => console.log('res.body: ',res.body)).then(() => setLocations(locations))
    }
  }
  
  

  return (
    <>
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
        <div className="grand_parent">
          <div className="parents">
            <div className="child">
              <div className="d-flex justify-content-between">
                <div className="system_tree1">Location</div>
                <div className="system_tree2">
                  <AuditLocationSwitch/>
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
                <StyledTreeItem nodeId="1" label="High Rise Apartments">
                      { locations?.length && locations.map((location , index)=>{
                        return (
                          <StyledTreeItem nodeId={location.id} key={index} label={location.name} onClick={(e)=>onLocationClick(e, location)}>
                              { currentLocation.sublocations?.length ? 
                                 currentLocation.sublocations.map((sublocation, indx)=>
                                 <StyledTreeItem nodeId={sublocation.id} key={indx} label={sublocation.path} onClick={(e)=>onLocationClick(e, sublocation)}/>) : ''
                              }
                            {/* { system.subsystems?.length ? (
                              system.subsystems.map((subsystem, key)=>
                              <StyledTreeItem nodeId={key} label={subsystem.name} onClick={(e)=>onSystemClick(e,subsystem)}>
                                { subsystem.subsystems?.length ? (
                                  subsystem.subsystems.map((subsystem, key)=><StyledTreeItem nodeId={key} label={subsystem.name} onClick={(e)=>setcurrentSystem(e,subsystem)}/>)
                                ) : null}
                              </StyledTreeItem>)
                            ): null} */}
                          </StyledTreeItem>
                        )
                      })}
                     </StyledTreeItem>
                    <LocationInput value={newLocationName} onChange={onLocationInputChange} placeholder="Add Location"/>
                     <AddLocationButton className="btn btn-md" color="secondary" type="submit" onClick={addLocation}> + Add Location</AddLocationButton>
                </TreeAudit>
                </TreeView>
                </TreeAudit>
              </div>
            </div>
            <div className="child">
              <p className="audit_template_header">{currentLocation?.name}</p>
              <div className="audit_systems">
                <div className="w-100 audit_template1"></div>
                <div className="col audit_template2">Description</div>
                <div className="w-100 audit_template3"></div>
                <div className="col audit_template_desc">
                  {currentLocation !==undefined ? currentLocation.description : null}
                </div>

                <div className="w-100 sub_systems"> </div>
                <div className="d-flex justify-content-between">
                  <div className="audit_subsystems">Sub Locations</div>
                  <div className="audit_subsystems_add_button">
                    <button className="au_subsystems_add_btn" type="submit" onClick={addSubLocation}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-100 audit_sub_location1_box"> </div>
                <div className="col">
                  <input
                    className="sub_location1_box_radius"
                    type="text"
                    onChange={onSubLocationInputChange}
                  ></input>
                </div>

                <div className="w-100 audit_template4"></div>
                <div className="d-flex justify-content-between">
                  <div className="audit_location">Related Systems</div>
                  <div className="audit_location_add_button">
                    <button className="au_add_btn" type="submit" onClick={addRelatedSystems}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-100 audit_location_box"> </div>
                <div className="col">
                  <input
                    className="location_box_radius"
                    type="text"
                  ></input>
                </div>

                <div className="w-100 help_articles"> </div>

                <div className="d-flex justify-content-between">
                  <div className="help_articles_text">Help Articles</div>
                  <div className="help_articles_add_button">
                    <button className="au_help_articles_add_btn" type="submit" onClick={addHelpArticles}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-100 help_articles_box"> </div>
                {articles && articles.length && (<div className="col">
                  <select name="help-articles" onChange={(e)=>console.log("DEBUG",e.target.value)}>
                    {articles.map(article => <option key={article._id}>{article.title}</option>) }
                  </select>
                </div>)}
                <div className="col">
                  <input
                    className="help_articles_box_radius"
                    type="text"
                  ></input>
                </div>
              </div>
            </div>

            <div className="child">
              <p className="audit_template_header"></p>
              <div className="w-100 checklist1"></div>
              <div className="col checklist2"></div>
              <div className="w-100 checklist3"></div>
            </div>
          </div>
        </div>
        <div className="template_btns_margin">
          <button type="button" className="save_audit_template_btn">
            Save
          </button>
          <button type="button" className="cancel_audit_template_btn">
            Cancel
          </button>
          <button type="button" className="savedraft_audit_template_btn">
            Save Draft
          </button>
        </div>
      </div>
    </>
  );
}
