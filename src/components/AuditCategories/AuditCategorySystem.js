import { React, useState , useEffect } from "react";
import "react-table-v6/react-table.css";
import SecondaryNav from "../Layouts/SecondaryNav";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AuditFire from "../../assets/images/AuditFire.PNG";
import "../Css/Sys.css";
import PropTypes from "prop-types";
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring";
import { AuditCategorySwitch } from "../AuditCategories/AuditCategoryLocation";
import { Edit } from "@material-ui/icons";
import { API_URL_BASE } from "../../utils/constant";
import { errorToaster, successToaster } from "../../common/common";
import { useSelector } from "react-redux";
import SystemTreeStructure from './SystemTreeStructure'
import axios from 'axios';
// import { text } from "@fortawesome/fontawesome-svg-core";
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

export const AddSystemButton = styled.button`
  border : 1px solid red;
  border-radius : 5px;
  height : 24px;
  width : auto;
  display : flex;
  align-items : center;
  justify-content : center;
  margin-top : 5px;
`;

export const SystemInput = styled.input`
  height : 24px;
  border-radius : 5px;
  border : 1px solid black;
  width : auto;
  color : black;
  font-size : 12px;
  text-align : center;
`

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
    borderLeft: `2px solid ${alpha(theme.palette.text.primary, 0.4)}`,
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

export const auditSystem = [
  {
    label : 'Egress System',
    subsystems : ['Stairways','Doors','Walls and Ceilings'],
    description : 'This is the emergency system exits. Each high rise apartment must have an emergency exit system.',
    locations : {
      label : 'Apartment Block',
      sublocation : ['Floor','Rooms','Corridor','Stairways'],
    }
  }
]

const newSystemTemplate = {
  subsystems : [],
  description : '',
  locations : [],
  help_articles : {},
  isSaved : false,
  isDraft : false,
  questionList : [],
};

export default function AuditCategorySystem() {
  const classes = useStyles();
  const { id } = useParams();
  // console.log(id)
  const [question, setQuestion] = useState(false);
  const [list,setList]=useState([]);
  const [currentAuditCat, setCurrentAuditCat] = useState()
  const [systems, setSystem] = useState([]);
  const [currentSystem, setcurrentSystem] = useState(systems[0]);
  const [subSystemInput, setSubSystemInput] = useState('');
  const [newSystemName , setNewSystemName] = useState('')
  const [typeQuestion,setTypeQuestion]=useState("")
  const [selectedType,setSelectedType]=useState('');
  const [description, setdescription] = useState('')
  const [adminanswer, setAdminanswer] = useState([])
  const [articles , setArticles] = useState([]);
  const token = useSelector((state)=> state.user.token)
  const [currentClickedPath, setCurrentClickedPath] = useState('')
  const [countOption, setCountOption] = useState(0)
  const [initialOptionsArr, setOptionsArr] = useState([""])
  const [enteredOption, setEnteredoption] = useState("")
  const [itemClicked, setItemClicked] = useState('')
  const [currentItem, setCurrentItem] = useState()
  const [newSystem, setNewSystem] = useState('')
  const [currentTree, setCurrentTree] = useState([])
  const [locationsSelected, setLocationsSelected] = useState([])
  const [systemSelected, setSystemSelected] = useState('')
  const [fetchedSystem, setFetchedSystem] = useState()
  const [currentSystemDescription, setCurrentSystemDescription] = useState()
  const [value, setValue] = useState([])
  const [relatedLocations, setRelatedLocations] = useState([])
  const [draftStatus, setDraftStatus] = useState(true)


  useEffect(() => {
    console.log(id)
    if(id){
      fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
        if(res.body.system_tree.length>0){
          setCurrentTree(res.body.system_tree)
        }
      })
    }
    fetch(`${API_URL_BASE}/articles/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => setArticles(data.body))
    if(id){
      fetch(`${API_URL_BASE}/auditCategories/getQuestions/${id}`).then(res => res.json()).then(res => setList(res.body))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  


  useEffect(() => {
    setcurrentSystem({...currentSystem})
    fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
      console.log('currentAudCat in useEffect: ', res.body)
      setCurrentAuditCat(res.body)
    })
    console.log('itemClicked: ', itemClicked)
    fetch(`${API_URL_BASE}/auditCategories/fetchSystem/${itemClicked}`).then(res => res.json()).then((res) => {
      console.log('system fetched in useEffect: ', res.body)
      console.log('currentSystemDescription: ', res.body[0]?.description)
    // setFetchedSystem(res.body)
    setCurrentSystemDescription(res.body[0]?.description)
    })
    fetch(
      `${API_URL_BASE}/auditCategories/getQuestionsForSystem/${itemClicked}`
    )
      .then((res) => res.json())
      .then((res, key) => {
        console.log(res)
        setList(res.body)});
    fetch(
      `${API_URL_BASE}/auditCategories/getRelatedLocations/${currentAuditCat?.name}/${itemClicked}`
    )
      .then((res) => res.json())
      .then((res, key) => {
        console.log('related locations: ', res)
        setRelatedLocations(res.body.related_locations)});
    // eslint-disable-next-line
  }, [systems, currentTree, itemClicked])

  const onSystemInputChange = (e) => {
    const systemLabel = e.target.value;
    setNewSystemName(systemLabel);
  }

  const addNewSystemToTree = (newSystem) => {   //updates the tree with new system and calls importCurrentTree
    console.log('currentItem: ', currentItem)
    if(currentItem){
      let current = [...currentTree];
      console.log('current: ', current)
      if (current[0].key === currentItem.key) {
        if (current[0].hasOwnProperty("children")) {
          current[0].children.push(newSystem);
        } else {
          current[0].children = [];
          current[0].children.push(newSystem);
        }
      } else if (current[0].hasOwnProperty("children")) {
        current[0].children.forEach((element) => {
          if(element.key === currentItem.key){
            if(element.hasOwnProperty('children')){
              element.children.push(newSystem)
            } else {
              element.children = [];
              element.children.push(newSystem)
            }
          }
        });
      }
      console.log('current: ', current)
      importCurrentTree(current)
    }
  };

  const addSystem = async () => {
    const label = newSystemName
    let newSystem = {
      title: newSystemName,
      key: `${currentItem?.key}-${(currentItem?.children && currentItem.children.length!==0) ? currentItem.children.length : 0}`,
    }
    let systemInDB = {
      name : label,
      description : '',
      audit_category: currentAuditCat.name,
      isSaved : false,
      isDraft : true
    }
    console.log(systemInDB)
    let systemCretionResult = await fetch(`${API_URL_BASE}/auditCategories/createNewSystem`,{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify(systemInDB)
    }).then(res => console.log(res.body))
    console.log('systemCretionResult: ', systemCretionResult)
    let related_locations = [...currentAuditCat.related_locations]
    console.log('related_locations: ', related_locations)
    related_locations.push({system: label, locations: []})
    console.log('related_locations: ', related_locations)

    setNewSystem(newSystem)
    addNewSystemToTree(newSystem)
    console.log('newSystemName: ', newSystemName)
    if(label !== ''){
      let newSystemPayload = {
        id: id,
        system_tree: currentTree,
        related_locations: related_locations
      }
      console.log('newSystemPayload: ', newSystemPayload)
      setNewSystemName('')
      fetch(`${API_URL_BASE}/auditCategories/updateSystem`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(newSystemPayload)
      }).then(res => setSystem(res.body))
    }
  }

  const onSubSystemInputChange = (e) => {
    setSubSystemInput(e.target.value)
  }
  

  const addSubSystem = () => {
    console.log("add sub sytem",subSystemInput,currentSystem)
    if(subSystemInput !== ''){
      const newSystem = {
        ...newSystemTemplate,
        name : subSystemInput,
        auditCategoryId : id,
        parentsystemId : currentSystem.id, 
        isSubSystem : true,
        path: currentClickedPath+`/${subSystemInput}`
      }
      console.log('newSubSystem: ', newSystem)
      fetch(`${API_URL_BASE}/auditCategories/createSubSystem`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(newSystem)
      }).then(res => res.json()).then(result => {
        if(result.success){
          successToaster(result.message)
        } 
        if(result.error){
          errorToaster(result.message)
        }
      }).then(() => console.log('systems after addSubSystem: ', systems))
     setSubSystemInput('');
    }
  }
 

  const addQuestion=()=>{
    let payload;
    if(selectedType==='Descriptive' || selectedType==='Yes/No'){
      let tempDescArr = []
      payload = {
        description : typeQuestion,
        questionType : selectedType,
        multiSingleOptions: [...tempDescArr],
        system : itemClicked,
        auditCat: currentAuditCat.name
      }
    } else {
      payload = {
        description : typeQuestion,
        questionType : selectedType,
        multiSingleOptions: adminanswer,
        system : itemClicked,
        auditCat: currentAuditCat.name
      }
    }
    console.log(payload)
    const data = fetch(`${API_URL_BASE}/auditCategories/addSystemQuestion`,{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify(payload)
    }).then(res => res.json()).then(result => {
      if(result.success){
        successToaster(result.message)
         const newQuestionList = [result.body,...list]
         setList(newQuestionList);
         setSelectedType('Select Question Type')
         setAdminanswer([])
         setTypeQuestion('')
      } 
      if(result.error){
        errorToaster(result.message)
      }
      return result.body
    })

    console.log("question add",data)
  }

  // console.log('systems: ', systems)

  const onSystemClick = async (e , system) => {
    setCurrentClickedPath(system.path)
    await fetch(`${API_URL_BASE}/auditCategories/getSystemById/${system.id}`).then(res => res.json()).then(res => setcurrentSystem(res.body));
    await fetch(`${API_URL_BASE}/auditCategories/getQuestions/${system.id}`).then(res => res.json()).then(res => setList(res.body));
    console.log(e.target)
  }

  const editCurrentSystemDescription = async () => {
    const payload = { description : description}
    const data = await fetch(`${API_URL_BASE}/auditCategories/editSystem/${itemClicked}/${currentAuditCat.name}`, 
     {method : 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify(payload)
     }).then(res => res.json()).then(data => { 
       successToaster(data.message)
       return data.body}).catch(err => errorToaster(err));
    //  setdescription('');
    console.log(data)
    //  setcurrentSystem(data);
  }

  const linkLocations = () => {
    let audCatCurrent = currentAuditCat
    let updatedArray = audCatCurrent.related_locations.map((each) => {
      if(each.system===itemClicked) each.locations = [...locationsSelected]
      return each
    })
    audCatCurrent.related_locations = [...updatedArray]
    console.log('linkLocations: ', audCatCurrent)
    let link_payload = {
      id: id,
      related_locations: audCatCurrent.related_locations
    }
    //adds selected locations to locations key of related_systems field of the auditcategories
    fetch(`${API_URL_BASE}/auditCategories/linkLocations/${currentSystem.id}`, 
     {method : 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify(link_payload)
     }).then(res => res.json()).then(data => { 
       successToaster(data.message)
       return data.body}).catch(err => errorToaster(err));

  }

  const importCurrentTree = (tree) => {   //prop method to Treestructure to import current system tree to as prop to SystemTreeStructure component
    console.log('inside importCurrentTree: ', tree)
    setCurrentTree(tree)
  }

  const clickHandler = (selectedKeys, info) => {   //captures the user click at a system and sets as current item
    console.log('Key Selected: ', selectedKeys)
    console.log('Item Selected: ', info)
    setItemClicked(info.node.title)
    setCurrentItem(info.node)
  }

  const getChildren = (system) => {   //fetch children of a tree element
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

  const locationSelectionHandler = (e) => {
    console.log(e.target.options)
    let updatedOptions = [...e.target.options]
      .filter(option => option.selected)
      .map(x => x.value);
      console.log("updatedOptions", updatedOptions);
      setLocationsSelected(updatedOptions);
      setValue(updatedOptions);
  }

  const NoneToDisplay = (rel_sys_arr) => {
    let flag = true
    rel_sys_arr.forEach((each, key) => {
      console.log(rel_sys_arr)
      if(each){
        flag = !flag
        return flag
      }
    })
  }

  const GetQuestions = async (system) => {
    const questionListToDisplay = await fetch(`${API_URL_BASE}/auditCategories/getQuestionsForSystem/${system}`).then(res => res.json()).then((res, key) => setList(res.body));
    return questionListToDisplay
  }

  const QuestionsToDisplay = () => {
    const questionList = list.map((each, key) => {
      console.log(each)
      return {Description: each.description, Type: each.questionType, Options: each.multiSingleOptions}
    })
    console.log(questionList)
    // return questionList
    // const questionList = [1, 2, 3]
    // const questionListLater = GetQuestions(system)
    // console.log(questionListLater)
    // const questionListToDisplay = await fetch(`${API_URL_BASE}/auditCategories/getQuestionsForSystem/${system}`).then(res => res.json()).then((res, key) => setList(res.body));
    // return questionList
    return questionList.map((each, key) => {
      return (
        <div>
          <div className="display_questions">
            {each.Description}{" "}
          </div>
          <div className="display_questions_type">{each.Type}</div>
          <div className="display_questions_type">
            {each.Options &&
              each.Options.length > 0 &&
              each.Options.map((each) => <div><li>{each}</li></div>)}
          </div>
        </div>
      );
    })
  }

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
              {/* {audit_cat_name} */}
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
                <div className="system_tree1">Systems</div>
                <div className="system_tree2">
                  <AuditCategorySwitch/>
                </div>
              </div>

              <div className="audit_template_tree">
                <SystemTreeStructure
                  clicked={clickHandler}
                  newSystem={newSystem}
                  currentItem={{ ...currentItem, ...{ expanded: true } }}
                  importCurrentTree={importCurrentTree}
                  // currentTreeToDisplay={currentAuditCat?.system_tree>0 ?currentAuditCat.system_tree : currentTree}
                  currentTreeToDisplay={currentTree}
                  treeName = {currentAuditCat?.name}
                />
                <SystemInput 
                  value={newSystemName}
                  textToDisplay={itemClicked}
                  // addNewLocation={addNewLocation}
                  onChange={onSystemInputChange} 
                  placeholder="Add New System"/>
                <AddSystemButton 
                  className="btn btn-md" 
                  color="secondary" 
                  type="submit" 
                  onClick={addSystem}> + Add System</AddSystemButton>
              </div>
            </div>
            <div className="child">
              <p className="audit_template_header">{itemClicked}</p>
              <div className="audit_systems">
                <div className="w-100 audit_template1"></div>
                <div className="desc_n_button">
                <div className="col audit_template2">Description</div>
                {/* Add a description if no description is existing; Add changes to save when adding a description */}
                {/* Edit a description if description is existing; Edit button changes to Save when editing a description */}
                <div className="audit_location_add_button">
                    <button className="desc_add_btn" type="submit" onClick={editCurrentSystemDescription}>
                      {/* {fetchedSystem?.description.length===0 ? 'Add' : 'Edit'} */}
                      Add
                    </button>
                    {/* {fetchedSystem?.description.length>0 && <Edit style={{width : '18px',height:'18px', marginLeft : '20px'}}/>} */}
                  </div>
                </div>
                <div className="w-100 audit_template3"></div>
                <div className="col audit_template_desc">
                  <p>{currentSystemDescription==="" ? 'No Description' : currentSystemDescription}</p>
                  <textarea d="fs" placeholder="Enter description to edit/update" name="description" rows="5" cols="60" onChange={(e)=>setdescription(e.target.value)}>{currentSystemDescription==="" ? 'No Description' : currentSystemDescription}</textarea>
                </div>
                <div className="w-100 audit_template4"></div>

                <div className="d-flex justify-content-between">
                  <div className="related_locations">
                    <div className="related_locations_text">Related Locations</div>
                    {relatedLocations.map(each => <div>{each}</div>)}
                  </div>
                  <div className="audit_location_add_button">
                    <button className="au_add_btn" type="submit" onClick={linkLocations}>
                      Link Locations
                    </button>
                    <div className="col">
                  {(currentAuditCat?.related_systems.length>0 && 
                    !(NoneToDisplay(currentAuditCat?.related_systems))) ?
                  <div>
                    <select
                      multiple={true}
                      value={value}
                      onChange={locationSelectionHandler}>
                        {currentAuditCat?.related_systems.map((each, key) => {
                          console.log('all locations: ', each)
                          return (<option value={each.location.toString()}>{each.location}</option>)
                        })}
                        
                    </select>
                  </div> : 'None'}
                </div>
                  </div>
                </div>

                <div className="w-100 audit_location_box"> </div>
                {/* <div className="col">{currentSystem.location}</div> */}
                

                <div className="w-100 sub_systems"> </div>
                <div className="d-flex justify-content-between">
                  {/* <div className="audit_subsystems">Sub Systems</div> */}
                  {/* <div className="audit_subsystems_add_button">
                    <button className="au_subsystems_add_btn" type="submit" onClick={addSubSystem}>
                      Add
                    </button>
                  </div> */}
                </div>

                <div className="w-100 audit_sub_location1_box"> </div>
                <div className="col">
                  
                </div>
                <div className="w-100 help_articles"> </div>
                <div className="d-flex justify-content-between">
                  <div className="help_articles_text">Help Articles</div>
                </div>

                <div className="w-100 help_articles_box"> </div>
                {articles && articles.length && (<div className="col">
                  <select name="help-articles" onChange={(e)=>console.log("DEBUG",e.target.value)}>
                    {articles.map(article => <option key={article._id}>{article.title}</option>) }
                    <option>None</option>
                  </select>
                </div>)}
              </div>
            </div>
            <div className="child">
              <p className="audit_template_header">
                {!question&&<button
                  onClick={() => setQuestion(true)}
                  type="submit"
                  className="checklist_big1"
                >
                  Add Question
                </button>}
              </p>
              {question ? (
                <div>
                  <div className="w-100 checklist1"></div>
                  {/* <div className="col checklist2"></div> */}
                  <div className="w-100 audit_questions_box"> </div>
                  <div className="col">
               
                    <input
                      className="questions_box_radius"
                      type="text"
                      required
                      placeholder="Type your question"
                      value={typeQuestion}
                      onChange={(text)=>setTypeQuestion(text.target.value)}
                    ></input>
                  
                  </div>
                  <div className="w-100 question_dropdown"> </div>
                  <div className="d-flex justify-content-between">
                    <div className="questions_dropdown_add">
                      <div>
                        <select
                          name="qtype"
                          required
                          id="qtype"
                          className="form-control"
                          style={{width: '60%'}}
                          value={selectedType}
                          onChange={(text)=>setSelectedType(text.target.value)}
                        >
                          <option hidden value>
                            Select Question Type
                          </option>
                          <option> Yes/No </option>
                          <option> Single Select </option>
                          <option> Multi Select </option>
                          <option> Descriptive </option>
                          <option> None </option>
                          {/* <option> Text Box </option>
                          <option> Number scale (1 to 5, 1 to 10) </option>  */}
                       
                        </select>
                      </div>
                      <div style={{marginTop: '10px'}}>
                        {selectedType==='Single Select' && 
                          initialOptionsArr.map((eachOption, idx) => {
                            let tempArr = []
                            return (<div key={idx} style={{marginTop: '10px'}}>
                              <input 
                                className="location_box_radius"
                                type="text"
                                placeholder="Add single select answer option here"
                                value={enteredOption}
                                onChange={(e) => {
                                  setEnteredoption(e.target.value);
                                }}
                                ></input><button 
                                  className='add_ans_opt_btn'
                                  onClick={() => {
                                    tempArr.push(enteredOption)
                                    setAdminanswer([...adminanswer, ...tempArr]);
                                    setEnteredoption("");
                          }}>Add Next Answer Option</button>
                            </div>)
                          }) 
                          }
                          {
                          selectedType==='Multi Select' &&
                          initialOptionsArr.map((eachOption, idx) => {
                            let tempArr = []
                            console.log({'enteredOption': enteredOption, 'adminanswer': adminanswer, 'initialOptionsArr': initialOptionsArr})
                            return (
                              <div key={idx} style={{ marginTop: '10px' }}>
                                <input
                                  className="location_box_radius"
                                  type="text"
                                  placeholder="Add multi select answer option here"
                                  value={enteredOption}
                                  onChange={(e) => {
                                    setEnteredoption(e.target.value);
                                  }}
                                />
                                <button
                                  className='add_ans_opt_btn'
                                  onClick={() => {
                                    tempArr.push(enteredOption)
                                    setAdminanswer([...adminanswer, ...tempArr]);
                                    setEnteredoption("");
                                  }}>
                                  Add Next Answer Option
                                </button>
                              </div>
                            );
                          })
                          }
                          {(selectedType==='Multi Select' || selectedType==='Single Select') && 
                            <div className="au_single_multi_options">
                              <div>{selectedType==='Multi Select' ? 'Multi Select' : 'Single Select'} Options</div>
                              <ul>
                                {adminanswer.length>0 && adminanswer.map((each, indx) => {
                                  return <li>{each}</li>
                                }) }
                              </ul>
                            </div>
                          }
                      </div>
                    </div>
                    <div className="au_questions_add_new">
                      <button onClick={()=>addQuestion()} className="au_questions_add_btn1" type="submit">
                        Add Questions
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* <p>Test question</p> */}
              <div>{itemClicked !== undefined ? QuestionsToDisplay() : ['none']}</div>
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