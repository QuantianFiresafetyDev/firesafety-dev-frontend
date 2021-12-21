import { React, useState, useEffect } from "react";
import "react-table-v6/react-table.css";
// import Navbar from "../Navbar/Navbar";
import SecondaryNav from "../Layouts/SecondaryNav";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import { API_URL_BASE } from "../../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LocationLogo from "../../assets/images/LocationLogo.PNG";
import { errorToaster, successToaster } from "../../common/common";
import AuditFire from "../../assets/images/AuditFire.PNG";
import { useSelector } from "react-redux";
import "../Css/Sys.css";
// import DeleteIcon from '@material-ui/icons/Delete';
// import { makeStyles } from '@material-ui/core/styles';
// import TreeView from '@material-ui/lab/TreeView';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import TreeItem from '@material-ui/lab/TreeItem';
import LocationTreeStructure from './LocationTreeStructure'
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 
import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring";
import axios from 'axios';

export const NavbarWrapper = styled.div`
  font-size: 16px;
  border-bottom: 1px solid red;
  font-weight: bold;
`;

export const Logo = styled.div`
  margin-left: 18px;
`;

export const SubLocationDiv = styled.div`
border : 1px solid black;
border-radius : 10px;
height : auto;
width : auto;
color : black;
font-size : 12px;
align-items: center;
vertical-align: middle
`

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

export const AuditCategorySwitch = () => {
  const history = useHistory();
  const { id } = useParams();
  return (
    <div className="system_tree3" type="submit">
      <button 
        className="toggle_button_location" 
        onClick={()=>history.push(`/AuditCategoryLocation/${id}`)}>
        <img
          className="loc_logo"
          src={LocationLogo}
          alt="try again"
        />
      </button>
      <button 
        className="toggle_button_systems" 
        onClick={()=>history.push(`/AuditCategorySystem/${id}`)}>
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

export default function AuditCategoryLocation() {
  const classes = useStyles();
  const { id } = useParams();
  // const [show,setShow]=useState(true)
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  const [subLocationInput, setSubLocationInput] = useState('');
  const [currentClickedPath, setCurrentClickedPath] = useState('')
  const [articles , setArticles] = useState([]);
  const [newLocationName, setNewLocationName] = useState('');
  const [currentAuditCat, setCurrentAuditCat] = useState()
  const [locationTree, setLocationTree] = useState([])
  const [currentTree, setCurrentTree] = useState([])
  const [itemClicked, setItemClicked] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [currentItem, setCurrentItem] = useState()
  const [value, setValue] = useState([])
  const [systemsSelected, setSystemsSelected] = useState([])
  const token = useSelector((state)=> state.user.token)
  const [draftStatus, setDraftStatus] = useState(true)
  const [RelatedSystems, setRelatedSystems] = useState([])

  useEffect(() => {
    if(id){
      fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
        if(res.body.location_tree.length>0) {
          setCurrentTree(res.body.location_tree)
          setCurrentAuditCat(res.body)
        }
      })
    }
    fetch(`${API_URL_BASE}/articles/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => setArticles(data.body))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCurrentLocation({...currentLocation})
    console.log('inside useeffect for locations, currentTree: ', locations, currentTree)

    fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
      setCurrentAuditCat(res.body)
    })

    fetch(
      `${API_URL_BASE}/auditCategories/getRelatedSystems/${currentAuditCat?.name}/${itemClicked}`
    )
      .then((res) => res.json())
      .then((res, key) => {
        console.log('related systems: ', res)
        setRelatedSystems(res.body.related_systems)});
    // eslint-disable-next-line
  }, [locations, currentTree, itemClicked])

  const onLocationInputChange = (e) => {
    console.log(e.target.value)
    const locationLabel = e.target.value;
    setNewLocationName(locationLabel);
  }
  

  const addSubLocation = () => {
    console.log("add sub location", subLocationInput, currentLocation)
    if(subLocationInput !== ''){
      const newLocation = {
        ...newLocationTemplate,
        title : subLocationInput,
        key : `${currentItem.key}-${(currentItem.children && currentItem.children.length!==0) ? currentItem.children.length : 0}`, 
        
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

    setSubLocationInput('');
    }
  }

  const linkSystems = async () => {
    if(currentAuditCat.isDraft){
    await fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
      setCurrentAuditCat(res.body)
      console.log('itemClicked: ', itemClicked)
      let updatedArray = res.body.related_systems.map((each) => {
        console.log('each.location:', each.location)
        console.log('systemsSelected: ', systemsSelected)
        if(each.location===itemClicked) {each.systems = [...systemsSelected]}
        return each
      })
      let link_payload = {
        id: id,
        related_systems: [...updatedArray]
      }

      console.log('link_payload: ', link_payload)

      if(draftStatus){
        fetch(`${API_URL_BASE}/auditCategories/linkSystems/${currentLocation.id}`,
       {method : 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(link_payload)
       }).then(res => res.json()).then(data => { 
         successToaster(data.message)
         return data.body}).catch(err => errorToaster(err));
      } else {
        errorToaster('Saved Audit Category cannot be modified')
      }
    })
    } else {
      errorToaster('Saved Audit Category cannot be modified')
    }

  }

  const addHelpArticles = () => {
    
  }

  const importCurrentTree = (tree) => {   //prop method to Treestructure to import current location tree to as prop to LocationTreeStructure component
    console.log('inside importCurrentTree: ', tree)
    setCurrentTree(tree)
    // addLocation()
  }

  const addNewLocationToTree = (newLocation) => {
    if(currentAuditCat.isDraft){
      console.log('currentItem: ', currentItem)
    if(currentItem){
      let current = [...currentTree];
      console.log('current: ', current)
      if (current[0].key === currentItem.key) {
        if (current[0].hasOwnProperty("children")) {
          current[0].children.push(newLocation);
        } else {
          current[0].children = [];
          current[0].children.push(newLocation);
        }
      } else if (current[0].hasOwnProperty("children")) {
        current[0].children.forEach((element) => {
          if(element.key === currentItem.key){
            if(element.hasOwnProperty('children')){
              element.children.push(newLocation)
            } else {
              element.children = [];
              element.children.push(newLocation)
            }
          }
        });
      }
      console.log('current: ', current)
      importCurrentTree(current)
    }
    } else {
      errorToaster('Saved Audit Category cannot be modified')
    }  //updates the tree with new location and calls importCurrentTree
    
  };

  const getChildren = (location) => {   //fetch children of a tree element
    console.log('currentItem: ', currentItem)
    if(currentItem){
      let current = [...currentTree];
      console.log('current: ', current)
      if (current[0].key === currentItem.key) {
        if (current[0].hasOwnProperty("children")) {
          return current[0].children
        } else {
          return null;
        }
      } else if (current[0].hasOwnProperty("children")) {
        current[0].children.forEach((element) => {
          if(element.key === currentItem.key){
            if(element.hasOwnProperty('children')){
              return element.children
            } else {
              return null;
            }
          }
        });
      }
      // console.log('current: ', current)
      // importCurrentTree(current)
    }
  };
  
  const addLocation = async () => {
    if(currentAuditCat.isDraft){
      const label = newLocationName
    
    let newLocation = {
      title: newLocationName,
      key: `${currentItem?.key}-${(currentItem?.children && currentItem.children.length!==0) ? currentItem.children.length : 0}`,
    }
    setNewLocation(newLocation)
    addNewLocationToTree(newLocation)

    await fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
      setCurrentAuditCat(res.body)
      let locationInDB = {
        name : label,
        description : '',
        audit_category: res.body.name,
        isSaved : false,
        isDraft : true
      }
      fetch(`${API_URL_BASE}/auditCategories/createNewlocation`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(locationInDB)
      }).then(res => console.log(res.body))

      let related_systems_existing = [...res.body.related_systems]
      // console.log('related_systems_existing before push: ',related_systems_existing)
      related_systems_existing.push({location: label, systems: []})

      if(label !== ''){
        let newLocationPayload = {
          id: id,
          location_tree: currentTree,
          related_systems: related_systems_existing
        }
        console.log('newLocationPayload: ', newLocationPayload)
        setNewLocationName('')
        if(draftStatus){
          fetch(`${API_URL_BASE}/auditCategories/updateLocation`,{
            method : 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : JSON.stringify(newLocationPayload)
          }).then(response => console.log('res.body: ',response.body)).then(() => setLocations(locations))
        } else {
          alert('Saved Audit Category cannot be modified')
        }
      }
    })
    } else {
      errorToaster('Saved Audit Category cannot be modified')
    }  //adds updated location tree to server
    
  }

  const clickHandler = (selectedKeys, info) => {   //captures the user click at a location and sets as current item
    console.log('Key Selected: ', selectedKeys)
    console.log('Item Selected: ', info)
    setItemClicked(info.node.title)
    setCurrentItem(info.node)
  }

  const systemSelectionHandler = (e) => {
    console.log(e.target.options)
    let updatedOptions = [...e.target.options]
      .filter(option => option.selected)
      .map(x => x.value);
      console.log("updatedOptions", updatedOptions);
      setSystemsSelected(updatedOptions)
      setValue(updatedOptions);
      // setValue(Array.from(e.target.selectedOptions, (item) => item.value))
  }
  

  // const addNewLocation = () => {   //creates a new location object and calls addNewLocationToTree
  //   console.log('newLocationTitle: ', newLocationName)
  //   let newLocation = {
  //     title: newLocationName,
  //     key: `${currentItem.key}-${(currentItem.children && currentItem.children.length!==0) ? currentItem.children.length : 0}`,
  //   }
  //   setNewLocation(newLocation)
  //   addNewLocationToTree(newLocation)
  // }

  const saveHandler = () => {
    const savePayload = {
      aud_cat: currentAuditCat.name,
      draft_status: false
    }
    console.log('Save Button Clicked')
    axios.put(`${API_URL_BASE}/auditCategories/updatedraftstatus`, savePayload).then(response => {
      console.log('draft status: ', response.data.body);
      setDraftStatus(false)
      successToaster(response.data.message)
    })
  }

  const cancelHandler = () => {
    console.log('Cancel Button Clicked')
  }
  
  const saveDraftHandler = () => {
    console.log('Save Draft Button Clicked')
    if(draftStatus){
      successToaster('Draft Audit Category Recorded until Saved')
    } else {
      errorToaster('Saved Audit Category cannot be modified')
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
                <p className="fa fa-angle-left"> {currentAuditCat?.name}</p>
              </Link>
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
                  <AuditCategorySwitch />
                </div>
              </div>

              <div className="audit_template_tree">
                
                <LocationTreeStructure
                  clicked={clickHandler}
                  newLocation={newLocation}
                  currentItem={{ ...currentItem, ...{ expanded: true } }}
                  importCurrentTree={importCurrentTree}
                  // currentTreeToDisplay={currentAuditCat?.location_tree}
                  currentTreeToDisplay={currentTree}
                  treeName={currentAuditCat?.name}
                />
                <LocationInput
                  value={newLocationName}
                  textToDisplay={itemClicked}
                  // addNewLocation={addNewLocation}
                  onChange={onLocationInputChange}
                  placeholder="Add New Location"
                />
                <AddLocationButton
                  className="btn btn-md"
                  color="secondary"
                  type="submit"
                  onClick={addLocation}
                >
                  {" "}
                  + Add Location
                </AddLocationButton>
              </div>
            </div>
            <div className="child">
              <p className="audit_template_header">{itemClicked}</p>
              <div className="audit_systems">
                <div className="w-100 audit_template1"></div>
                <div className="col audit_template2">Description</div>
                <div className="w-100 audit_template3"></div>
                <div className="col audit_template_desc">
                  {currentLocation !== undefined
                    ? currentLocation.description
                    : null}
                </div>

                <div className="w-100 sub_systems"> </div>
                <div className="d-flex justify-content-between">
                  <div className="audit_subsystems">Sub Locations</div>
                  <div className="audit_subsystems_add_button">
                    <button
                      className="au_subsystems_add_btn"
                      type="submit"
                      onClick={addSubLocation}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-100 audit_sub_location1_box"> </div>
                <div className="col">
                  <div className="sublocation_display">
                    {/* <SubLocationDiv> */}
                    <div className="sub_locations">
                      Display sub-locations under {itemClicked}
                    </div>
                    {currentItem?.hasOwnProperty("children") ? (
                      currentItem.children.map((each) => (
                        <div>{each.title}</div>
                      ))
                    ) : (
                      <div>No Sub-locations Found</div>
                    )}
                    {/* {getChildren(itemClicked)!==null ? getChildren(itemClicked)?.map(each => <div>{each.title}</div>) : <div>No Sub-locations Found</div>} */}
                    {/* </SubLocationDiv> */}
                  </div>
                  {/* <input
                    className="sub_location1_box_radius"
                    type="text"
                    onChange={onSubLocationInputChange}></input> */}
                </div>

                <div className="w-100 audit_template4"></div>
                <div className="d-flex justify-content-between">
                  <div className="related_sys">
                    <div className="related_systems_text">Related Systems</div>
                    {RelatedSystems?.map((each, key) => {
                      return <div>{each}</div>
                      })}
                  </div>
                  <div className="audit_location_add_button">
                    <button
                      className="au_add_btn"
                      type="submit"
                      onClick={linkSystems}
                    >
                      Link Systems
                    </button>
                    <div>
                      <select
                        multiple={true}
                        value={value}
                        onChange={systemSelectionHandler}
                      >
                        {currentAuditCat?.related_locations.map((each, key) => {
                          console.log("all systems: ", each);
                          return (
                            <option value={each.system.toString()}>
                              {each.system}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                {/* <div className="w-100 audit_location_box"> </div>
                <div className="col">
                  <input className="location_box_radius" type="text"></input>
                </div> */}

                <div className="w-100 help_articles"> </div>

                <div className="d-flex justify-content-between">
                  <div className="help_articles_text">Help Articles</div>
                  <div className="help_articles_add_button">
                    <button
                      className="au_help_articles_add_btn"
                      type="submit"
                      onClick={addHelpArticles}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-100 help_articles_box"> </div>
                {articles && articles.length && (
                  <div className="col">
                    <select
                      name="help-articles"
                      onChange={(e) => console.log("DEBUG", e.target.value)}
                    >
                      {articles.map((article) => (
                        <option key={article._id}>{article.title}</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* <div className="col">
                  <input
                    className="help_articles_box_radius"
                    type="text"></input>
                </div> */}
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
          <button
            type="button"
            className="save_audit_template_btn"
            onClick={saveHandler}
          >
            Save
          </button>
          <Link
            to="/ViewAuditCategories"
          >
            <button
              type="button"
              className="cancel_audit_template_btn"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            {/* <p className="fa fa-angle-left"> {currentAuditCat?.name}</p> */}
          </Link>

          <button
            type="button"
            className="savedraft_audit_template_btn"
            onClick={saveDraftHandler}
          >
            Save Draft
          </button>
        </div>
      </div>
    </>
  );
}
