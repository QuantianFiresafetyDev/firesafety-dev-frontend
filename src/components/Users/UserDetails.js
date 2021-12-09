import { React, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import ReactTable from 'react-table-v6';
import "react-table-v6/react-table.css";
// import Navbar from '../Navbar/Navbar';
import SecondaryNav from '../Layouts/SecondaryNav';
import '../Css/Sys.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import UserTimeline from '../UserTimeline/UserTimeline';
import moment from 'moment'
import axios from 'axios'
// import { userData } from './ViewUsers';

// import { NavLink } from "react-router-dom";
// import NavLogo from '../../assets/images/NavLogo.PNG';
import { API_URL_BASE } from '../../utils/constant';
// import instance from '../../axios';
// import requests from '../../requests';
import { useSelector } from 'react-redux';
import { errorToaster, successToaster } from 'common/common';

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

const OnGoingWrapper = styled.div`
   display: flex;
   flex-direction : column;




   .ReactTable{
     .rt-table{
       .rt-thead{
         background-color : white;
         
         .rt-th{
          text-align: left;
          border-right:  transparent;
          padding: 1.1rem;
          position: relative;
          left: -8px;
          font-size: 13px; 
        }
       }

       .rt-tbody{

         .rt-tr-group{
           &:hover{
             background-color : grey;
             color : white;
             cursor: pointer;
           }
         }
         .rt-td{
          margin: 0;
          padding: 1.1rem;
          border-right: 0.2px  white;
          position: relative;
          left: -8px;
          font-size: 14px; 
    
         }
         
       }
      
     }
   }
`;

// const NavSpace = styled.div`
//   margin-left: 1rem;
// `


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
function UserDetails(props) {
  const [value, setValue] = useState(0);
  const [data, setData] = useState({})
  const token = useSelector((state)=> state.user.token)
  const { id } = useParams();
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [phoneText, setPhoneText] = useState('')
  const [userAudits, setUserAudits] = useState([])
  // const [emp_id, setEmp_id] = useState("")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUserData = async () => {

    await fetch(`${API_URL_BASE}/user/${id}`).then(res => res.json()).then((data) => {
      console.log('user: ', data)
      // setEmp_id(data.body.emp_id)
      setData(data.body)
    })}
  
    const fetchUserAuditsAssigned = async () => {
      await fetch(`${API_URL_BASE}/audit/assignee/${emp_id}`).then(res => res.json()).then((auditdata) => {
        console.log('audits assigned to user: ', auditdata.body)
        setUserAudits(auditdata.body)})
    }

  useEffect(() => {
    axios.get(`${API_URL_BASE}/user/${id}`).then(response => {
      console.log('user: ', response.data.body);
      setData(response.data.body)
    })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const { firstname, lastname, emp_id, role, phone, email } = data;

  useEffect(() => {
    axios.get(`${API_URL_BASE}/audit/assignee/${emp_id}`).then((response) => {
      console.log('setUserAudits: ', response)
      setUserAudits(response.data.body)})
    }, [emp_id]) 

  const handleEdit = () => {
    setIsEdit(true);
    setPhoneText(phone);
  }
  const handleSubmit = async(e) => {
    const payload = {
      phone: phoneText
    };

    const response = await fetch(`${API_URL_BASE}/user/update/${id}`,{
      method : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body : JSON.stringify(payload)
    }).then(res => res.json()).then(data => {
      if(data.success){
      successToaster(data.message)
    } 
    if(data.error){
      errorToaster(data.message)
    }
    return setData(data.body)})
    console.log(response);
    // .then(res=> res.json()).then(data=> setData(data.body))
    setIsEdit(false)
    console.log('submit')
  }

  
  // const allUser = userData;
  // console.log("rf",userData)
  // const userDataById = allUser.filter(data => data.employeeid.toString() === id.toString())[0]
  // console.log("data is ",value ,);
  

  const ongoingData = userAudits.map((each) => {
    return {
      audit_name: each.name,
      created_date: moment(each.created_date).format("DD-MM-YYYY"),  
      start_date: moment(each.start_date).format("DD-MM-YYYY")
    }
  })

  const columns = [{
    Header: (
      <span className="volume-hdr">
        <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Audit Name</span>
        <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
      </span>
    ),
    accessor: 'audit_name'

  }, {
    Header: (
      <span className="volume-hdr">
        <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Created Date</span>
        <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
      </span>
    ),
    accessor: 'created_date'
  }, {
    Header: (
      <span className="volume-hdr">
        <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Start Date</span>
        <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
      </span>
    ),
    accessor: 'start_date'
  }]


  return (
    <>
      <SecondaryNav />
      <h5 className="users_b"><span onClick={()=>history.goBack()}><p className="fa fa-angle-left" > </p> {firstname} {lastname}</span></h5>
      <TabDesign>
        <div className="user_tabs">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab style={{ textTransform: "capitalize", fontSize: "16px", fontWeight: "bold" }} label="Details" {...a11yProps(0)} />
            <Tab style={{ textTransform: "capitalize", fontSize: "16px", fontWeight: "bold" }} label="Timeline" {...a11yProps(1)} />
          </Tabs>
        </div>
      </TabDesign>

      <TabPanel value={value} index={0}>
        <section className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-5" >
                <div className="user_details_box">
                  <div className="p-4 border rounded" >


                    <div className="d-flex justify-content-between">
                      <div className="user_name">{firstname} {lastname}</div>
                      <div className="d-flex">
                        { isEdit ? <p className="fa fa-plus" onClick={(e) => handleSubmit(e)}></p> 
                        : <p className="fa fa-pencil" onClick={handleEdit}></p> }

                        <div className="fa fa-ellipsis-v ml-3">
                        </div>
                      </div>
                      
                    </div>
                    <h6 className="user_details">Details</h6>

                    <div className="row">
                      <div className="col-sm">
                        ID: {emp_id}
                      </div>
                      <div className="col-sm">
                        Role: {role}
                      </div>
                      <div className="col-sm">
                        Position: Fire Audit Officer
                      </div>
                    </div>

                    <div className="audit_details1">
                      <div className="d-flex justify-content-between">
                        <div className="details_email">Email: {email}
                        </div>
                        <div>
                          <div className="details_phone">
                          Mobile: { isEdit ? <input value={phoneText} onChange={e => setPhoneText(e.target.value)}/> : <span>{phone}</span> }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact_person" >
                      <h6 className="contact_person1" >OnGoing Audits</h6>
                    </div>

                    <div className="md-5 mt-3">

                      <OnGoingWrapper className="container">
                        <ReactTable
                          data={ongoingData}
                          columns={columns}
                          defaultPageSize={5}
                          showPagination={false}

                        />
                      </OnGoingWrapper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserTimeline />
      </TabPanel>

    </>



  );
}

export default UserDetails;