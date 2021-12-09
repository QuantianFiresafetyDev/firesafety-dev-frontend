// import {React} from 'react';
// import ReactTable from "react-table-v6";
// import "react-table-v6/react-table.css";
// import {} from "react-router-dom";
// import styled from 'styled-components';
// import { } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSort } from '@fortawesome/free-solid-svg-icons'
// import '../Css/Sys.css';



// const AuditResultsWrapper = styled.div`
// display: flex;
// flex-direction : column;
// padding : 1px;
 



// .ReactTable{
//   .rt-table{
//     .rt-thead{
//       background-color : white;
      
//     }

//     .rt-tbody{
//       .rt-tr-group{
//         &:hover{
//           background-color : grey;
//           color : white;
//           cursor: pointer;
//         }
           
//       }
//       ${'' /* .rt-td{
//           margin-left: 35px;
       
//       } */}
//     }
//   }
// }
// `;


// export const auditResultsData = [
//   {
//     task_id : 1,
//     task: "Extinguisher Refil System",
//     task_type: "Extinguisher Refill System",
//     task_path: "Fire Extinguishers > Subsystem",
//     task_update: "Replace Fire Extinguisher Sand",
//     estimated_cost: "Rs 3500",
//     score_impact: "+3",
//   },
//   {
//     task_id : 2,
//     task: "Fire Hydrant Block 1",
//     task_type: "Fire Hydrant",
//     task_path: "Fire Hydrants > Equipment",
//     task_update: "Replace Fire Hydrant",
//     estimated_cost: "Rs 10000",
//     score_impact: "+5",
//   },
 
//   {
//     task_id : 3,
//     task: "Emergency Exit Block 3",
//     task_type: "Emergency Exits",
//     task_path: "Emergency exits > Sub Systems",
//     task_update: "Build Emergency Exit",
//     estimated_cost: "Rs 7000",
//     score_impact: "+5",
//   },

//   {
//     task_id : 4,
//     task: "Block A 7th floor-1",
//     task_type: "Fire Extinguisher",
//     task_path: "Fire Extinguishers > Equipment",
//     task_update: "Buy new fire extinguisher",
//     estimated_cost: "Rs 750",
//     score_impact: "+1",
//   },
// ];


// function AuditResults() {
//   const columns = [
//     {
//       Header: (
//         <span className="volume-hdr">
//           <span className="pr-2">Task</span>
//           <FontAwesomeIcon icon={faSort}/>
//         </span>
//       ),
//       accessor: "task",
//     },
//     {
//       Header:(
//         <span className="volume-hdr">
//           <span className="pr-2">Type</span>
//           <FontAwesomeIcon icon={faSort}/>
//         </span>
//       ),
//       accessor: "task_type",
//     },
//     {
//       Header: (
//         <span className="volume-hdr">
//           <span className="pr-2">Path</span>
//           <FontAwesomeIcon icon={faSort}/>
//         </span>
//       ),
//       accessor: "task_path",
//     },
//     {
//       Header: (
//         <span className="volume-hdr">
//           <span className="pr-2">Task</span>
//           <FontAwesomeIcon icon={faSort}/>
//         </span>
//       ),
//       accessor: "task_update",
//     },
//     {
//       Header: (
//         <span className="volume-hdr">
//           <span className="pr-2">Estimated Cost</span>
//           <FontAwesomeIcon icon={faSort}/>
//         </span>
//       ),
//       accessor: "estimated_cost",
//     },
//     {
//       Header: (
//         <span className="volume-hdr">
//           <span className="pr-2">Score Impact</span>
//           <FontAwesomeIcon icon={faSort}/>
//         </span>
//       ),
//       accessor: "score_impact",
//     },
//   ];


 
//   return (
//     <div >
//         <div style ={{display: 'flex', justifyContent: "center"}} >
//           <div className="row">
//       <div className="col-lg-18 mb-5" style ={{top: "-25px"}}>
//        <div className="p-5 border rounded" style ={{marginRight: "45px", marginLeft: "45px"}} >
//               <div>
//               <div class="row">
//                 <div class="col-sm">
//                 <div className="site-section">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-18 mb-5">
//               <div className="p-4 border rounded">
              
//                   <div className="d-flex justify-content-between">
//                 <div className = "audit_name">Score</div>
//               <div className= "edit_logo"> <p ></p></div>
//              <div className="fa fa-ellipsis-v" ></div>
//           </div>
//              <p></p>
//              <h6 className = "audit_details">Details</h6>
             
//                 <div className="row">
//                     <div className="col-sm">
//                     Assignee:
//                     </div>
//                     <div className="col-sm">
//                     Created Date: 
//                     </div>
//                     <div className="col-sm">
//                     Start Date: 
//                     </div>
//                 </div>

//             <div className = "audit_details1" >
//             <div  className="row">
//                 <div className="col-sm">
//                 Progress: 56%
//                 </div>
//                 <div className="col-sm">
//                 Audit Category: High rise buiding audit
//                 </div>
//                 <div className="col-sm">
//                 Number of floors: 17
//                 </div>
//              </div>
            
       
//             </div>          
//             <div className = "contact_person" >
//             <h6 className = "contact_person1" >Contact Person</h6>
//             </div>
                 
//             <div className="row">
//               <div className="col-sm">
//                 Name: 
//               </div>
//               <div className="col-sm">
//                 Phone:
//               </div>
//               <div className="col-sm">
//               </div>          
//             </div>
//           </div>
//         </div>
//       </div>
//    </div>
//    </div>
//                 </div>
//                 <div class="col-sm">
//                 <div className="site-section">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-18 mb-5">
//               <div className="p-4 border rounded">
              
//                   <div className="d-flex justify-content-between">
//                 <div className = "audit_name">What is affecting the score?</div>
//               <div className= "edit_logo"> <p className="fa fa-pencil"></p></div>
//              <div className="fa fa-ellipsis-v" ></div>
//           </div>
//              <p></p>
//              <h6 className = "audit_details">Details</h6>
             
//                 <div className="row">
//                     <div className="col-sm">
//                     Assignee:
//                     </div>
//                     <div className="col-sm">
//                     Created Date: 
//                     </div>
//                     <div className="col-sm">
//                     Start Date: 
//                     </div>
//                 </div>

//             <div className = "audit_details1" >
//              <div  className="row">
//                 <div className="col-sm">
//                 Progress: 56%
//                 </div>
//                 <div className="col-sm">
//                 Audit Category: High rise buiding audit
//                 </div>
//                 <div className="col-sm">
//                 Number of floors: 17
//                 </div>
                
//              </div>
            
       
//             </div>          
//             <div className = "contact_person" >
//             <h6 className = "contact_person1" >Contact Person</h6>
//             </div>
                 
//             <div className="row">
//               <div className="col-sm">
//                 Name: 
//               </div>
//               <div className="col-sm">
//                 Phone:
//               </div>
//               <div className="col-sm">
//               </div>          
//             </div>
//           </div>
//           </div>
//         </div>
//       </div>
//    </div>
//    </div>
//    </div>
  
//    </div>
   
//    <AuditResultsWrapper class="container">
//       <div >
//       <div className="d-flex justify-content-between">
//                 <div className = "table_top">Cost Analysis</div>
//               <div className= "filter_logo"> <p className="fa fa-filter"></p></div>
//              <div className="three_dots"> <p className="fa fa-ellipsis-v"></p></div>
//           </div>
//         </div>
//         <ReactTable
//           data={auditResultsData}
//           columns={columns}
//           showPagination={false}
//           defaultPageSize={4}
      
//           />
//       </AuditResultsWrapper>



//                 </div>
                
//                 </div>
//               </div>
//             </div>
//     </div>
    
 
  
    

    

//   );
// }

// export default AuditResults;