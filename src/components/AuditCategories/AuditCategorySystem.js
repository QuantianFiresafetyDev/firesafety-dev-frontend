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
  const [systemKeys, setSystemKeys] = useState([])


  useEffect(() => {
    // console.log(id)
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
      fetch(`${API_URL_BASE}/auditCategories/getQuestions/${id}`).then(res => res.json()).then((res) => {
        // console.log('question list in useeffect: ', res.body);
        let questionList = res.body.filter((each) => each.audiCat === currentAuditCat.name)
        setList(questionList)})
    }
    if(id){
      axios.get(`${API_URL_BASE}/auditCategories/getSystemKeys/${id}`).then((res) => {
        // console.log('getSystemKeys in useEffect: ', res.data.body)
        setSystemKeys(res.data.body.systemKeys)
      })
    }

  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  


  useEffect(() => {
    setcurrentSystem({...currentSystem})
    
    fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
      // console.log('currentAudCat in useEffect: ', res.body)
      setCurrentAuditCat(res.body)
    })
    // console.log('itemClicked: ', itemClicked)
    if(itemClicked !== ''){
      fetch(`${API_URL_BASE}/auditCategories/fetchSystem/${itemClicked}`).then(res => res.json()).then((res) => {
        // console.log('system fetched in useEffect: ', res.body)
        // console.log('currentSystemDescription: ', res.body[0]?.description)
      // setFetchedSystem(res.body)
      setCurrentSystemDescription(res.body[0]?.description)
      })

      // console.log('itemClicked in useEffect: ', itemClicked)
    fetch(
      `${API_URL_BASE}/auditCategories/getQuestionsForSystem/${itemClicked}`
    )
      .then((res) => res.json())
      .then((res, key) => {
        // console.log(res)
        // console.log('question list in useeffect: ', res.body)
        let questionsRelevant = res.body.filter((each) => each.auditCat === currentAuditCat.name)
        setList(questionsRelevant)});

        fetch(
          `${API_URL_BASE}/auditCategories/getRelatedLocations/${id}/${itemClicked}`
        )
          .then((res) => res.json())
          .then((res, key) => {
            // console.log('related locations: ', res, key)
            setRelatedLocations(res.body.related_locations)});

    }

    fetch(`${API_URL_BASE}/auditCategories/getSystemKeys/${id}`)
      .then((res) => res.json())
      .then((res) => {
        // console.log('getSystemKeys in useEffect below: ', res)
        // console.log('system key list in useeffect: ', res.body.systemKeys)
        setSystemKeys(res.body.systemKeys)
        });
    // eslint-disable-next-line
  }, [systems, currentTree, itemClicked, selectedType])

  const onSystemInputChange = (e) => {
    const systemLabel = e.target.value;
    setNewSystemName(systemLabel);
  }

    // iterative modified to achieve beyond depth>3
    const addSystemToArrayHandler = (newSystem) => {
      // console.log('inside addLocationToArrayHandler: ', newSystem)
      if(currentAuditCat.isDraft){
        // console.log('currentItem: ', currentItem)
      if(currentItem){
        let found = false
        let current = [...currentTree];
        // console.log('current: ', current)
        if (current[0].key === currentItem.key) {
          if (current[0].hasOwnProperty("children")) {
            current[0].children.push(newSystem);
            found = true
          } else {
            current[0].children = [];
            current[0].children.push(newSystem);
            found = true
          }
          importCurrentTree(current)
        } else if (current[0].hasOwnProperty("children")) {
              for (let i = 0; i < current[0].children.length; i++) {
                if(current[0].children[i].key === currentItem.key){
                  if(current[0].children[i].hasOwnProperty("children")){
                    current[0].children[i].children.push(newSystem)
                    found = true
                  } else {
                    current[0].children[i].children = []
                    current[0].children[i].children.push(newSystem)
                    found = true
                  }
                  importCurrentTree(current)
                } else if(current[0].children[i].hasOwnProperty("children")){
                  
                  for (let j = 0; j < current[0].children[i].children.length; j++) {
                    if(current[0].children[i].children[j].key === currentItem.key){
                      if(current[0].children[i].children[j].hasOwnProperty("children")){
                        // console.log('i=',i,' j=', j, current[0].children[i].children[j])
                        current[0].children[i].children[j].children.push(newSystem)
                        found = true
                      } else {
                        current[0].children[i].children[j].children = []
                        current[0].children[i].children[j].children.push(newSystem)
                        found = true
                      }
                      importCurrentTree(current)
                    } else if(current[0].children[i].children[j].hasOwnProperty("children")){
                      for (let k = 0; k < current[0].children[i].children[j]?.children?.length; k++) {
                        if(current[0].children[i].children[j].children[k].key === currentItem.key){
                          if(current[0].children[i].children[j].children[k].hasOwnProperty("children")){
                            // console.log('i=',i,' j=', j, ' k=', k, current[0].children[i].children[j].children[k])
                            current[0].children[i].children[j].children[k].children.push(newSystem)
                            found = true
                          } else {
                            current[0].children[i].children[j].children[k].children = []
                            current[0].children[i].children[j].children[k].children.push(newSystem)
                            found = true
                          }
                          importCurrentTree(current)
                        } else if(current[0].children[i].children[j].children[k].hasOwnProperty("children")){
                          for (let l = 0; l < current[0].children[i].children[j].children[k]?.children?.length; l++) {
                            if(current[0].children[i].children[j].children[k].children[l].key === currentItem.key){
                              if(current[0].children[i].children[j].children[k].children[l].hasOwnProperty("children")){
                                current[0].children[i].children[j].children[k].children[l].children.push(newSystem)
                                
                              } else {
                                current[0].children[i].children[j].children[k].children[l].children = []
                                current[0].children[i].children[j].children[k].children[l].children.push(newSystem)
                              }
                              importCurrentTree(current)
                            } else if(current[0].children[i].children[j].children[k].children[l].hasOwnProperty("children")){
                              for (let m = 0; m < current[0].children[i].children[j].children[k].children[l]?.children?.length; m++) {
                                if(current[0].children[i].children[j].children[k].children[l].children[m].key === currentItem.key){
                                  if(current[0].children[i].children[j].children[k].children[l].children[m].hasOwnProperty("children")){
                                    current[0].children[i].children[j].children[k].children[l].children[m].children.push(newSystem)
                                  } else {
                                    current[0].children[i].children[j].children[k].children[l].children[m].children = []
                                    current[0].children[i].children[j].children[k].children[l].children[m].children.push(newSystem)
                                  }
                                  importCurrentTree(current)
                                } else if(current[0].children[i].children[j].children[k].children[l].children[m].hasOwnProperty("children")){
                                  for (let n = 0; n < current[0].children[i].children[j].children[k].children[l].children[m]?.children?.length; n++){
                                    if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].key === currentItem.key){
                                      if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].hasOwnProperty("children")){
                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children.push(newSystem)
                                      } else {
                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children = []
                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children.push(newSystem)
                                      }
                                      importCurrentTree(current)
                                    } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].hasOwnProperty("children")) {
                                      for (let p = 0; p < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children?.length; p++){
                                        if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].key === currentItem.key){
                                          if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].hasOwnProperty("children")){
                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children.push(newSystem)
                                          } else {
                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children = []
                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children.push(newSystem)
                                          }
                                          importCurrentTree(current)
                                        } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].hasOwnProperty("children")){
                                          for (let q = 0; q < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p]?.children.length; q++){
                                            if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].key === currentItem.key){
                                              if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].hasOwnProperty("children")){
                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children.push(newSystem)
                                              } else {
                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children = []
                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children.push(newSystem)
                                              }
                                              importCurrentTree(current)
                                            }  else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].hasOwnProperty("children")){
                                              for (let r = 0; r < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children?.length; r++) {
                                                if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].key === currentItem.key){
                                                  if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].hasOwnProperty("children")){
                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children.push(newSystem)
                                                  } else {
                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children = []
                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children.push(newSystem)
                                                  }
                                                  importCurrentTree(current)
                                                } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].hasOwnProperty("children")) {
                                                  for (let s = 0; s < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children?.length; s++){
                                                    if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].key === currentItem.key){
                                                      if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].hasOwnProperty("children")){
                                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children.push(newSystem)
                                                      } else {
                                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children = []
                                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children.push(newSystem)
                                                      }
                                                      importCurrentTree(current)
                                                    } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].hasOwnProperty("children")){
                                                      for (let t = 0; t < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[s].children?.length; t++){
                                                        if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].key === currentItem.key){
                                                          if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].hasOwnProperty("children")){
                                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children.push(newSystem)
                                                          } else {
                                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children = []
                                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children.push(newSystem)
                                                          }
                                                          importCurrentTree(current)
                                                        } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].hasOwnProperty("children")){
                                                          for (let u = 0; u < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[s].children[t].children?.length; u++){
                                                            if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].key === currentItem.key){
                                                              if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].hasOwnProperty("children")){
                                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children.push(newSystem)
                                                              } else {
                                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children = []
                                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children.push(newSystem)
                                                              }
                                                              importCurrentTree(current)
                                                            } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].hasOwnProperty("children")){
                                                              for (let v = 0; v < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[s].children[t].children[u].children?.length; v++){
                                                                if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].key === currentItem.key){
                                                                  if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].hasOwnProperty("children")){
                                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children.push(newSystem)
                                                                  } else {
                                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children = []
                                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children.push(newSystem)
                                                                  }
                                                                  importCurrentTree(current)
                                                                } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].hasOwnProperty("children")){
                                                                  for (let w = 0; w < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[s].children[t].children[u].children[v].children?.length; w++){
                                                                    if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].key === currentItem.key){
                                                                      if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].hasOwnProperty("children")){
                                                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children.push(newSystem)
                                                                      } else {
                                                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children = []
                                                                        current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children.push(newSystem)
                                                                      }
                                                                      importCurrentTree(current)
                                                                    } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].hasOwnProperty("children")){
                                                                      for (let x = 0; x < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[s].children[t].children[u].children[v].children[w].children?.length; x++){
                                                                        if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].key === currentItem.key){
                                                                          if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].hasOwnProperty("children")){
                                                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children.push(newSystem)
                                                                          } else {
                                                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children = []
                                                                            current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children.push(newSystem)
                                                                          }
                                                                          importCurrentTree(current)
                                                                        } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].hasOwnProperty("children")){
                                                                          for (let y = 0; y < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[s].children[t].children[u].children[v].children[w].children[x].children?.length; y++) {
                                                                            if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].key === currentItem.key){
                                                                              if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].hasOwnProperty("children")){
                                                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children.push(newSystem)
                                                                              } else {
                                                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children = []
                                                                                current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children.push(newSystem)
                                                                              }
                                                                              importCurrentTree(current)
                                                                            } else if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].hasOwnProperty("children")) {
                                                                              for (let z = 0; z < current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y]?.children?.length; x++){
                                                                                if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].key === currentItem.key){
                                                                                  if(current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].hasOwnProperty("children")){
                                                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children.push(newSystem)
                                                                                  } else {
                                                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children = []
                                                                                    current[0].children[i].children[j].children[k].children[l].children[m].children[n].children[p].children[q].children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children.push(newSystem)
                                                                                  }
                                                                                  importCurrentTree(current)
                                                                                }   
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                    }   
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                    }
                                                  }
                                                }
                                              }
                                            } 
                                          }
      
                                      } 
      
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            // console.log('current: ', current)
            // importCurrentTree(current)
          }
          //   }
          // });
      importCurrentTree(current)   
      } else {
        errorToaster('Saved Audit Category cannot be modified')
      }  //updates the tree with new location and calls importCurrentTree
      
    };
  }
    }
    
  const addSystem = async () => {
    if (currentAuditCat.isDraft) {
      const label = newSystemName;
      let newSystem = {
        title: newSystemName,
        key: `${currentItem?.key}-${
          currentItem?.children && currentItem?.children?.length !== 0
            ? currentItem?.children?.length
            : 0
        }`,
      };
      // console.log("response from getSystemKeys as updated in useEffect: ", systemKeys);
      // setSystemKeys(systemKeys);
      if (!(systemKeys.includes(newSystem.key))) {
        // console.log("currentTree in addSystem: ", currentTree);
        // console.log("currentItem in addSystem: ", currentItem);
        // console.log("newSystem in AddSystem: ", newSystem, "currentItem.children.length=", currentItem?.children?.length);
        let systemKeyArray = [...systemKeys];
        systemKeyArray.push(newSystem.key);
        setSystemKeys(systemKeyArray);
        let systemKeyPayload = {
          systemKeys: [...systemKeyArray],
        };
        // console.log('systemKeyPayload: ', systemKeyPayload)
        await axios.post(`${API_URL_BASE}/auditCategories/postSystemKeys/${id}`, systemKeyPayload).then((res) => {
          // console.log("postSystemKey response: ", res);
        }).catch((err) => console.log('error in POST: ', err));
        if (newSystem.title.length > 0 && newSystem.title[0] !== " ") {
          let systemInDB = {
            name: label,
            description: "",
            audit_category: currentAuditCat.name,
            isSaved: false,
            isDraft: true,
          };
          // console.log(systemInDB);
          let systemCreationResult = fetch(
            `${API_URL_BASE}/auditCategories/createNewSystem`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(systemInDB),
            }
          ).then((res) => console.log(res.body));
          // console.log("systemCreationResult: ", systemCreationResult);
          let related_locations = [...currentAuditCat.related_locations];
          // console.log("related_locations: ", related_locations);
          related_locations.push({ system: label, locations: [] });
          // console.log("related_locations: ", related_locations);

          setNewSystem(newSystem);
          // addNewSystemToTree(newSystem)
          addSystemToArrayHandler(newSystem);
          // console.log("newSystemName: ", newSystemName);
          if (label !== "") {
            let newSystemPayload = {
              id: id,
              system_tree: currentTree,
              related_locations: related_locations,
            };
            // console.log("newSystemPayload: ", newSystemPayload);
            setNewSystemName("");
            fetch(`${API_URL_BASE}/auditCategories/updateSystem`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(newSystemPayload),
            }).then((res) => setSystem(res.body));
          }
        } else {
          errorToaster("Please enter a system name");
        }
      } else {
        errorToaster("User to Select System before Adding System");
      }

    } else {
      errorToaster("Saved Audit Category cannot be modified");
    }
    
  }

  const addQuestion=()=>{
    if(currentAuditCat.isDraft){
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
    // console.log(payload)
    if((payload.questionType==="Single Select" || payload.questionType==="Multi Select")){
      if((payload.questionType !== '') && (!(payload.description.includes("  ")) && (payload.description[0] !== " ") && (payload.description.length !== 0) && (payload.multiSingleOptions.length>0))){
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
            // console.log('result: ', result);
            let addedQuestions = [...list]
            addedQuestions.push(result?.body.description)
            // let addedQuestions = result?.body.filter((each) => each.auditCat === currentAuditCat.name)
             const newQuestionList = [...addedQuestions]
            //  console.log('question list in addQuestion: ', newQuestionList)
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
        // console.log("question add",data)
      } else {
        errorToaster("Question/Question Type Cannot be Empty")
      }
    } else {
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
            // console.log('result yesno desc: ', result);
            let addedQuestions = [...list]
            addedQuestions.push(result?.body.description)
            // let addedQuestions = result.body.filter((each) => each.auditCat === currentAuditCat.name)
             const newQuestionList = [...addedQuestions]
            //  console.log('question list in addQuestion: ', newQuestionList)
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
        // console.log("question add",data)
      
    }
    } else {
      errorToaster('Saved Audit Category cannot be modified')
    }
  }

  const editCurrentSystemDescription = async () => {
    if(currentAuditCat.isDraft){
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
    // console.log(data)
    } else {
      errorToaster('Saved Audit Category cannot be modified')
    }
  }

  const linkLocations = () => {
    if(currentAuditCat.isDraft){
      let audCatCurrent = currentAuditCat
      let updatedArray = audCatCurrent.related_locations.map((each) => {
        if(each.system===itemClicked) each.locations = [...locationsSelected]
        return each
      })
      audCatCurrent.related_locations = [...updatedArray]
      // console.log('linkLocations: ', audCatCurrent)
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
    } else {
      errorToaster('Saved Audit Category cannot be modified')
    }
  }

  const importCurrentTree = (tree) => {   //prop method to Treestructure to import current system tree to as prop to SystemTreeStructure component
    // console.log('inside importCurrentTree: ', tree)
    setCurrentTree(tree)
  }

  const clickHandler = (selectedKeys, info) => {   //captures the user click at a system and sets as current item
    // console.log('Key Selected: ', selectedKeys)
    // console.log('Item Selected: ', info)
    setItemClicked(info.node.title)
    setCurrentItem(info.node)
  }


  const locationSelectionHandler = (e) => {
    // console.log(e.target.options)
    let updatedOptions = [...e.target.options]
      .filter(option => option.selected)
      .map(x => x.value);
      // console.log("updatedOptions", updatedOptions);
      setLocationsSelected(updatedOptions);
      setValue(updatedOptions);
  }

  const NoneToDisplay = (rel_sys_arr) => {
    let flag = true
    rel_sys_arr.forEach((each, key) => {
      // console.log(rel_sys_arr)
      if(each){
        flag = !flag
        return flag
      }
    })
  }

  const QuestionsToDisplay = () => {
    const questionList = list.map((each, key) => {
      // console.log(each)
      return {Description: each.description, Type: each.questionType, Options: each.multiSingleOptions}
    })
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
    // console.log('Save Button Clicked')
    axios.put(`${API_URL_BASE}/auditCategories/updatedraftstatus`, savePayload).then(response => {
      // console.log('draft status: ', response.data.body);
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
          {/* <div className="template_clone">
            <p className="fa fa-clone"></p>
          </div>
          <div className="template_trash">
            <p>
              <FontAwesomeIcon icon={faTrash} />
            </p>
          </div> */}
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
                    {relatedLocations?.map(each => <div>{each}</div>)}
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
                          // console.log('all locations: ', each)
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
                          {/* <option> None </option> */}
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
                                    
                                    if((!enteredOption.includes("  ")) && (enteredOption[0] !== " ") && (enteredOption.length !== 0)){
                                      tempArr.push(enteredOption)
                                      setAdminanswer([...adminanswer, ...tempArr]);
                                      setEnteredoption("");
                                    } else {
                                      errorToaster("Option cannot be blank or start with space")
                                    }}}>Add Next Answer Option</button>
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
                                    if((!enteredOption.includes("  ")) && (enteredOption[0] !== " ") && (enteredOption.length !== 0)){
                                      tempArr.push(enteredOption)
                                      setAdminanswer([...adminanswer, ...tempArr]);
                                      setEnteredoption("");
                                    } else {
                                      errorToaster("Option cannot be blank or start with space")
                                    }
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