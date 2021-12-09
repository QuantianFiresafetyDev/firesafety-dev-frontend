import {React}from 'react';
// import { useHistory } from 'react-router-dom';
import  ReactTable  from 'react-table-v6';
import "react-table-v6/react-table.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import '../Css/Sys.css';




const UserTimelineWrapper = styled.div`
   display: flex;
   flex-direction : column;
   padding : 12px;
  




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
      
          padding: 1.1rem;
          border-left: transparent;
          border-right: transparent;
          position: relative;
          left: -9px;
          font-size: 14px;
        
   

    

         }
         
       }
     }
   }
`;




function UserTimeline(){

  const usertimelineData = [
    {

      audit_name: "Shanthi Apartments",
      name: "Extinguisher Refill System",
      type: "Extinguisher refill System",
      path: "Fire Extinguishers > Sub System",
      inspection_date: "30/01/2021",
      status: "Complete",
    },

    {
      audit_name: "Shanthi Apartments",
      name: "Block A 8th floor-1",
      type: "Fire Extinguisher",
      path: "Fire Extinguishers > Equipment",
      inspection_date: "30/01/2021",
      status: "In-Progress",
    },

    {
      audit_name: "Shanthi Apartments",
      name: "Block A 8th floor-2",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "In-Progress",
    },

    {
      audit_name: "Shanthi Apartments",
      name: "Block A 7th floor-1",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "Complete",
    },

    {
      audit_name: "Shanthi Apartments",
      name: "Block A 7th floor-2",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "Complete",
    },
    {
      audit_name: "Shanthi Apartments",
      name: "Block A 7th floor-2",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "Complete",
    },
    {
      audit_name: "Shanthi Apartments",
      name: "Block A 7th floor-2",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "Complete",
    },
    {
      audit_name: "Shanthi Apartments",
      name: "Block A 7th floor-2",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "Complete",
    },
    {
      audit_name: "Shanthi Apartments",
      name: "Block A 7th floor-2",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "Complete",
    },
     {
      audit_name: "Shanthi Apartments",
      name: "Block A 7th floor-2",
      type: "Fire Extinguisher",
      path: "Fire Extinguisher > Equipment",
      inspection_date: "30/01/2021",
      status: "Complete",
    },
  ]; 
  const columns = [

    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Audit Name</span>
          <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "audit_name",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Name</span>
          <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "name",
    },
    {
      Header:  (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Type</span>
          <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "type",
    },
    {
      Header:  (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Path</span>
          <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "path",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Inspection Date</span>
          <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "inspection_date",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Status</span>
          <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "status",
    },
  ]; 


  return (

    
     <>
    
     <div className ="user_timeline_table">
     <UserTimelineWrapper class="container" >
     <div >
      <div className="d-flex justify-content-between">
                <div className = "user_inspection_table_top">Inspection Timeline</div>
              <div className= "user_inspection_filter_logo"> <p className="fa fa-filter"></p></div>
             <div className="user_inspection_three_dots"> <p className="fa fa-ellipsis-v"></p></div>
          </div>
        </div>
     <ReactTable  
                  data={usertimelineData}  
                  columns={columns}  
                  defaultPageSize={5}
                  showPagination={false}      
                  
              /> 
    </UserTimelineWrapper>
        </div>

     
  </>

  );
}

export default UserTimeline;
