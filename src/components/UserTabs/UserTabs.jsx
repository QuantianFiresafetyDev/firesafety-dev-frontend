// import {React, useState} from 'react';
// import {Link, useParams} from "react-router-dom";
// import Navbar from '../Navbar/Navbar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import '../Css/Sys.css';
// import { auditData } from '../ViewAudits/ViewAudits';
// import AuditHistory from '../AuditHistory/AuditHistory';
// import styled from 'styled-components';

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const TabDesign = styled.div`
//       display: flex;
//       justify-content: center;
// `

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <div p={1}>
//           <div>{children}</div>
//         </div>
//       )}
//     </div>
//   );
// }


// function UserTabs(props) {
//   const [value, setValue] = useState(0);
//   const  { id } = useParams();

//   const handleChange = (event , newValue) => {
//     setValue(newValue);
//   };
  
//   const allAudit = auditData;
//   const auditDataById = allAudit.filter(data => data.audit_id.toString() === id.toString())[0]
//   console.log("data is ",value , );
//   const { audit_name , address , assignee , created_date , start_date , contact_person , phone } = auditDataById;
//   return (
//     <> 
//     <Navbar/>
//     <h5 className="audit"><Link to = "/ViewAudits" className= "audit_back_button"><p className="fa fa-angle-left" > </p></Link> {audit_name} Audit </h5>
//   <TabDesign>
//     <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//       <Tab label="Audit Details" {...a11yProps(0)} />
//       <Tab label="Audit History" {...a11yProps(1)} />
//     </Tabs>
//     </TabDesign>

//     <TabPanel value={value} index={0}>
       
//       </TabPanel>
//     <TabPanel value={value} index={1}>
//       <AuditHistory/>
//     </TabPanel>
    
//     </>

    

//   );
// }

// export default UserTabs;