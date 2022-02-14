import { React, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
// import Navbar from '../Navbar/Navbar';
import SecondaryNav from '../Layouts/SecondaryNav';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../Css/Sys.css';
import AuditHistory from './AuditHistory';
import styled from 'styled-components';
import AuditResults from './AuditResults';

import { API_URL_BASE } from '../../utils/constant';
import { useSelector } from 'react-redux';
// import methods from 'react-table-v6/lib/methods';
import { errorToaster, successToaster } from 'common/common';
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import moment from 'moment';
import axios from 'axios';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";

// import user from 'reducers/user';
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

export const But = styled.div`

color: red;
`

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabDesign = styled.div`
      display: flex;
      justify-content: center;
    
     
  
`


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}

      {...other}
    >
      {value === index && (
        <div p={1}>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}
// const NavSpace = styled.div`
//   margin-left: 1rem;
// `

function AuditDetails(props) {
  const [value, setValue] = useState(0);
  const [data, setData] = useState({})
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false)
  const token = useSelector((state)=> state.user.token)
  const [auditCategories , setAuditCategories] = useState([]);
  const [auditCategory , setAuditCategory] = useState('');
  const [users , setUsers] = useState([]);
  const [newAssignee , setAssignee] = useState();
  const [draftStatus, setDraftStatus] = useState(true)
  const [answerData, setAnswerData] = useState([])
  // const [contact, setContact] = useState({
  //   name: contact_person.name,
  //   phone: contact_person.phone
  // })
  // const [phoneText, setPhoneText] = useState('')
   
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // console.log('AuditDetails audit id: ', id)
    async function fetchData(){
      await fetch(`${API_URL_BASE}/audit/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json()).then(data => {
        // console.log('useeffect getting audit details: ',data)
        setData(data.body[0])})
      await fetch(`${API_URL_BASE}/auditCategories/`).then(res => res.json()).then((data) => {
        // console.log('setAuditCategories in useeffect: ', data.body)
        setAuditCategories(data.body)
        setDraftStatus(data.body.isDraft)
      });
      await fetch(`${API_URL_BASE}/user/allemployees`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json()).then(userdata=>setUsers(userdata.body))

    }
    fetchData()
    axios.get(`${API_URL_BASE}/answers/auditid/${id}`)
    .then((response) => {console.log('answerData response:', response); setAnswerData(response.data.body)})
    .catch(err=>console.log(err))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async(e) => {
    // console.log('auditCategory: ', auditCategory)
    const selectedAuditCategory = auditCategories.filter(each => each.name===auditCategory)
    // console.log('inside handleSubmit selectedAuditCategory: ', selectedAuditCategory)
    if(!selectedAuditCategory[0].isDraft){
      // console.log('inside fetch block with draftStatus set to: ', draftStatus)
      const payload = {
        audit_category : auditCategory,
        assignee : newAssignee,
      }
      await fetch(`${API_URL_BASE}/audit/assign/${id}`,{
        method : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => { 
        successToaster(data.message)
        setData(data.body)
      })
      .catch(err => errorToaster(err))
    setIsEdit(false)
    // console.log('submit')
    }
    await fetch(`${API_URL_BASE}/auditCategories/checksavestatus/${auditCategory}`,{
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => { 
      successToaster(data.message)
      // console.log('handleSubmit response: ', data)
      setDraftStatus(data.body.draft)
    }).catch(err => errorToaster(err))
  }


  const handleEdit = () => {
    setIsEdit(true);
    // setPhoneText(phone);
  }

  const onAssigneeDropdownChange = (e) => {
    // console.log("DEBUG",e.target.value);
    setAssignee(e.target.value)
  }

  const downloadCSVHandler = () => {
    // console.log('answer Data: ', answerData)
    let answerCSVData = []
    
    answerData.forEach((each) => {
      each.answerObj.forEach((eachAns) => {
        let tempObj = {
          "Audit ID": each.auditID,
          "Auditor Emp ID": each.emp_id,
          "Audit Location": each.location,
          "System Audited": each.system,
          "Audit Category": each.auditCat,
          "Question ID": eachAns.questionID,
          "Question Type": eachAns.questionType,
          "Question Description": eachAns.questionDesc,
          "Answer": eachAns.answerDesc,
          "Completed": each.completed,
          "Audit Creation Date": each.createdAt,
          "Audit Date": each.updatedAt
        }
        answerCSVData.push(tempObj)
      })
    })
    const resultObj = [{"Audit_Results":answerCSVData}]
    // const resultObj = Object.assign({}, answerCSVData)
    const resultJSON = JSON.parse(resultObj)
    // console.log('final audit CSV data: ', JSON.stringify(resultObj))
    const blob = new Blob([resultJSON], {type: 'text/json'})
    const a = document.createElement('a')
    a.download = `${data.id}_${data.name}.csv`
    a.href = window.URL.createObjectURL(blob)
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    a.dispatchEvent(clickEvent)
    a.remove()
  }


  let answerCSVData = []
    
    answerData?.forEach((each) => {
      each.answerObj.forEach((eachAns) => {
        let tempObj = {
          "Audit ID": each?.auditID,
          "Auditor Emp ID": each?.emp_id,
          "Audit Location": each?.location,
          "System Audited": each?.system,
          "Audit Category": each?.auditCat,
          "Question ID": eachAns?.questionID,
          "Question Type": eachAns?.questionType,
          "Question Description": eachAns?.questionDesc,
          "Answer": eachAns?.answerDesc,
          "Completed": each?.completed,
          "Audit Creation Date": each?.createdAt,
          "Audit Date": each?.updatedAt
        }
        answerCSVData.push(tempObj)
      })
    })
  

  // console.log('data: ', data)

  const { name: audit_name, contact_person, address, assignee, created_date, start_date, progress, floors, audit_category } = data;
  // const date = created_date ? new Date(created_date).toDateString() : new Date();
  return (
    <>
      <SecondaryNav />
      <h5 className="audit">
        <Link to="/ViewAudits" className="audit_back_button">
          <p className="fa fa-angle-left"> {audit_name} Audit </p>
        </Link>
      </h5>
      {/* <div >
      <div className="d-flex justify-content-between">
                <div className = "angle_arrow"><p className="fa fa-angle-left"></p></div>
              <div className= "audit_angle"> {audit_name} </div>
          </div>
        </div> */}
      <TabDesign>
        <div className="audit_tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              style={{
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              label="Details"
              {...a11yProps(0)}
            />
            <Tab
              style={{
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              label="History"
              {...a11yProps(1)}
            />
            <Tab
              style={{
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              label="Results"
              {...a11yProps(1)}
            />
            {/* <Tab label="Audit Results" {...a11yProps(2)} /> */}
          </Tabs>
        </div>
      </TabDesign>

      <TabPanel value={value} index={0}>
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-5">
                <div className="audit_details_box">
                  <div className="p-4 border rounded">
                    <div className="d-flex justify-content-between">
                      <div className="audit_name">{audit_name}</div>
                      <div className="d-flex">
                        {isEdit ? (
                          <p
                            className="fa fa-plus"
                            onClick={(e) => handleSubmit(e)}
                          ></p>
                        ) : (
                          <p className="fa fa-pencil" onClick={handleEdit}></p>
                        )}
                        <div className="fa fa-ellipsis-v ml-3"></div>
                      </div>
                    </div>
                    <p>{address}</p>
                    <h6 className="audit_details">Details</h6>
                    <div className="row">
                      <div className="col-sm">
                        Assignee details:{" "}
                        {isEdit ? (
                          <select onChange={onAssigneeDropdownChange}>
                            {users.map((user) => (
                              <option>{user.emp_id}</option>
                            ))}
                          </select>
                        ) : (
                          assignee
                        )}
                      </div>
                      <div className="col-sm">
                        Created Date:{" "}
                        {moment(created_date).format("DD-MM-YYYY")}
                      </div>
                      <div className="col-sm">
                        Start Date: {moment(start_date).format("DD-MM-YYYY")}
                      </div>
                    </div>

                    <div className="audit_details1">
                      <div className="row">
                        <div className="col-sm">Progress: {progress}</div>
                        <div className="col-sm">
                          Audit Category:{" "}
                          {isEdit ? (
                            <select
                              onChange={(e) => setAuditCategory(e.target.value)}
                            ><option>None</option>
                              {auditCategories.map((item) => (
                                <option>{item.name}</option>
                              ))
                              }
                              ){" "}
                            </select>
                          ) : (
                            data.audit_category
                          )}
                        </div>
                        <div className="col-sm">Number of floors: {floors}</div>
                      </div>
                    </div>
                    <div className="contact_person">
                      <h6 className="contact_person1">Contact Person</h6>
                    </div>

                    <div className="row">
                      <div className="col-sm">Name: {contact_person?.name}</div>
                      <div className="col-sm">
                        Phone: {contact_person?.phone}
                      </div>
                      <div className="col-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <button
                className='download-btn'
                onClick={downloadCSVHandler}
                ><DownloadOutlined size='large'/></button> */}
            {answerData.length>0 && <CSVLink
              data={answerCSVData}
              filename={`${data.id}_${data.name}.csv`}
            >
              <div className="download_comp">
                <Button
                  type="danger"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="large"
                />
                <div className="download_button_text">
                  Download Audit Results
                </div>
              </div>
            </CSVLink>}
            ;
            {/* <Button
                type="danger"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                onClick={downloadCSVHandler}
              />
              <div className="download_button_text">Download Audit Results</div> */}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AuditHistory
          auditToBeDone={data}
          inspection_date={moment(data.start_date).format("DD-MM-YYYY")}
        />
      </TabPanel>
      {/* <TabPanel value={value} index={2}> */}

        {/* Results/Dashboard Tab */}
        {/* <AuditHistory
          auditToBeDone={data}
          inspection_date={moment(data.start_date).format("DD-MM-YYYY")}
        /> */}
      {/* </TabPanel> */}

      <TabPanel value={value} index={2}>
      <AuditResults/> 
    </TabPanel>
    </>
  );
}

export default AuditDetails;