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
import { AuditLocationSwitch } from "../Audits/AuditLocation";
import { Edit } from "@material-ui/icons";
import { API_URL_BASE } from "../../utils/constant";
import { errorToaster, successToaster } from "../../common/common";
import { useSelector } from "react-redux";
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

// const NavSpace = styled.div`
//   margin-left: 1rem;
// `;

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

export default function AuditTemplate() {
  const classes = useStyles();
  const { id } = useParams();
  const [question, setQuestion] = useState(false);
  const [list,setList]=useState([]);
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
  // const allCategoryAudit = auditCategoryData;
  // const auditCatDataById = allCategoryAudit.filter(
  //   (data) => data.audit_cat_id.toString() === id.toString()
  // )[0];
  // const { name } = auditCatDataById;
  // const purple ="orange";
  // const [bg, setBg ] = useState(purple);

  // const bgChange = () =>{
  //  let newBg ='#34495e';
  //  setBg(newBg);
  //   };

  useEffect(() => {
    if(id){
      fetch(`${API_URL_BASE}/auditCategories/getSystemByCategory/${id}`).then(res => res.json()).then(res => setSystem(res.body))
    }
    fetch(`${API_URL_BASE}/articles/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => setArticles(data.body))
    if(currentSystem?.id){
      fetch(`${API_URL_BASE}/auditCategories/getQuestions/${id}`).then(res => res.json()).then(res => setList(res.body))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  


  useEffect(() => {
    setcurrentSystem({...currentSystem})
    // eslint-disable-next-line
  }, [systems])

  const onSystemInputChange = (e) => {
    const systemLabel = e.target.value;
    setNewSystemName(systemLabel);
  }

  const addSystem = () => {
    const label = newSystemName
    console.log('newSystemName: ', newSystemName)
    if(label !== ''){
      const newSystem = {
        ...newSystemTemplate,
        name : label,
        auditCategoryId : id,
        parentsystemId : '', 
        isSubSystem : false,
        path: '/'+label
      }
      console.log('newSystem: ', newSystem)
      setNewSystemName('')
      fetch(`${API_URL_BASE}/auditCategories/createSystem`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(newSystem)
      }).then(res => setSystem(res.body)).then(() => {
        console.log('systems after addSystem: ',systems);
      })
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
    //  const allSystem = [...systems];
    //  const index = allSystem.findIndex(item => item.label === currentSystem.label);
    //  const newSubSystem = allSystem[index].subsystem.concat([subSystemInput])
    //  const system = {
    //    ...allSystem[index],
    //    subsystem : newSubSystem,
    //  }
    //  allSystem[index] = system;
    //  setSystem(allSystem)
     setSubSystemInput('');
    }
  }
 

  const addQuestion=()=>{
    let payload;
    if(selectedType==='Descriptive'){
      let tempDescArr = []
      tempDescArr.push(enteredOption)
      // setAdminanswer([...tempDescArr])
      payload = {
        description : typeQuestion,
        questionType : selectedType,
        multiSingleOptions: tempDescArr,
        system_id : currentSystem.id
      }
    } else {
      payload = {
        description : typeQuestion,
        questionType : selectedType,
        multiSingleOptions: adminanswer,
        system_id : currentSystem.id
      }
    }
    console.log(payload)
    const data = fetch(`${API_URL_BASE}/auditCategories/addQuestion`,{
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
      } 
      if(result.error){
        errorToaster(result.message)
      }
      return result.body
    })

    console.log("question add",data)


  //  list.push({
  //    question:typeQuestion,
  //    questionType:selectedType
  //  })

  //  setList([...list]);
  //  setQuestion(false)
  //  console.log("Data",list)
  }

  console.log(systems)

  const onSystemClick = async (e , system) => {
    setCurrentClickedPath(system.path)
   await fetch(`${API_URL_BASE}/auditCategories/getSystemById/${system.id}`).then(res => res.json()).then(res => setcurrentSystem(res.body));
   await fetch(`${API_URL_BASE}/auditCategories/getQuestions/${system.id}`).then(res => res.json()).then(res => setList(res.body));
   console.log(e.target)
  }

  const addCurrentSystemDescription = async () => {
    const payload = { description : description}
    const data = await fetch(`${API_URL_BASE}/auditCategories/editSystem/${currentSystem.id}`, 
     {method : 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify(payload)
     }).then(res => res.json()).then(data => { 
       successToaster(data.message)
       return data.body}).catch(err => errorToaster(err));
     setdescription('');
     setcurrentSystem(data);
  }

  const addLocation = async () => {
    //addLocation Handler to be implemented here

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
                    <StyledTreeItem nodeId="1" label="All Systems">
                      { systems?.length && systems.map((system , index)=>{
                        return (
                          <StyledTreeItem nodeId={system.id} key={index} label={system.name} onClick={(e)=>onSystemClick(e,system)}>
                              { currentSystem.subsystems?.length ? 
                                 currentSystem.subsystems.map((subsystem, indx)=>
                                 <StyledTreeItem nodeId={subsystem.id} key={indx} label={subsystem.path} onClick={(e)=>onSystemClick(e,subsystem)}/>) : ''
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
                    <SystemInput value={newSystemName} onChange={onSystemInputChange} placeholder="Add system"/>
                     <AddSystemButton className="btn btn-md" color="secondary" type="submit" onClick={addSystem}> + Add Systems</AddSystemButton>
                    </TreeAudit>
                  </TreeView>
                </TreeAudit>
              </div>
            </div>
            <div className="child">
              <p className="audit_template_header">{currentSystem?.name}</p>
              <div className="audit_systems">
                <div className="w-100 audit_template1"></div>
                <div className="desc_n_button">
                <div className="col audit_template2">Description</div>
                <div className="audit_location_add_button">
                    <button className="desc_add_btn" type="submit" onClick={addCurrentSystemDescription}>
                      Add
                    </button>
                  </div>
                </div>
                <div className="w-100 audit_template3"></div>
                <div className="col audit_template_desc">
                  {currentSystem?.description ? <p>{currentSystem.description}</p> : <textarea d="fs" name="description" rows="5" cols="60" onChange={(e)=>setdescription(e.target.value)}></textarea> }
                </div>
                <div className="w-100 audit_template4"></div>

                <div className="d-flex justify-content-between">
                  <div className="audit_location">Locations</div>
                  <div className="audit_location_add_button">
                    <button className="au_add_btn" type="submit" onClick={addLocation}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-100 audit_location_box"> </div>
                {/* <div className="col">{currentSystem.location}</div> */}
                <div className="col">
                 { currentSystem?.locations?.map(location => <div className="mb-2">{location.name}</div>) }
                  <input
                    className="location_box_radius"
                    type="text"
                    placeholder="Add location here"
                  ></input>
                </div>

                <div className="w-100 sub_systems"> </div>
                <div className="d-flex justify-content-between">
                  <div className="audit_subsystems">Sub Systems</div>
                  <div className="audit_subsystems_add_button">
                    <button className="au_subsystems_add_btn" type="submit" onClick={addSubSystem}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-100 audit_sub_location1_box"> </div>
                <div className="col">
                  { currentSystem?.subsystems?.map((item,key)=><div className="mb-2">{item.name}</div>) }
                  <input
                    className="sub_location3_box_radius"
                    onChange={onSubSystemInputChange}
                    type="text"
                    id="fname"
                    name="fname"
                  />
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
            {
              list.map(item=>{
                return(
                  <>
                  <div  className="display_questions">{item.description} <Edit style={{width : '18px',height:'18px', marginLeft : '20px'}}/></div>
                  <div  className="display_questions_type">{item.questionType}</div>
                  <div  className="display_questions_type">{item.multiSingleOptions && item.multiSingleOptions.length>0 && item.multiSingleOptions.map(each => <div>{each}</div>)}</div>

                  </>
                )
              })
            }
              <p className="audit_template_header">
                {!question&&<button
                  onClick={() => setQuestion(true)}
                  type="submit"
                  className="checklist_big1"
                >
                  Add
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
    </>
  );
}